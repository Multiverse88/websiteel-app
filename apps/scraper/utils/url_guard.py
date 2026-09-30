"""
Safe URL and network guard for competitor scraper.
Enforces SSRF prevention, domain boundaries, and URL normalization.
"""

from __future__ import annotations

import ipaddress
import re
import socket
from urllib.parse import parse_qsl, urlencode, urlparse, urlunparse

# Query parameters to strip during normalization
TRACKING_PARAMS = {
    "utm_source",
    "utm_medium",
    "utm_campaign",
    "utm_term",
    "utm_content",
    "utm_id",
    "fbclid",
    "gclid",
    "msclkid",
    "mc_eid",
    "_ga",
    "_gl",
    "ref",
    "source",
}

# Path patterns to ignore during crawling
IGNORE_PATH_PATTERNS = [
    r"^/(?:wp-admin|wp-login|wp-json|xmlrpc\.php)",
    r"^/(?:login|logout|signin|signout|register|auth)",
    r"^/(?:cart|checkout|basket|order|my-account|account)",
    r"^/(?:search|\?s=)",
    r"^/(?:cdn-cgi|autodiscover)",
    r"\.(?:pdf|zip|rar|gz|tar|exe|dmg|iso|apk|docx?|xlsx?|pptx?)$",
    r"\.(?:png|jpe?g|gif|webp|svg|ico|bmp|tiff?|mp4|mov|avi|mp3|wav|ogg)$",
    r"\.(?:css|js|map|woff2?|ttf|eot)$",
]
_IGNORE_PATH_REGEX = re.compile("|".join(IGNORE_PATH_PATTERNS), re.IGNORECASE)


def is_ip_blocked(ip: ipaddress.IPv4Address | ipaddress.IPv6Address) -> bool:
    """Check if an IP address is private, loopback, link-local, or reserved."""
    return (
        ip.is_private
        or ip.is_loopback
        or ip.is_reserved
        or ip.is_link_local
        or ip.is_multicast
        or ip.is_unspecified
    )


def is_safe_url(url: str, resolve_dns: bool = True) -> tuple[bool, str]:
    """
    Validate that a URL is safe to crawl (public HTTP/HTTPS, no SSRF, no credentials).
    Returns (is_safe, error_reason).
    """
    if not url or not isinstance(url, str):
        return False, "URL is empty or invalid"

    try:
        parsed = urlparse(url.strip())
    except Exception as e:
        return False, f"Failed to parse URL: {e}"

    if parsed.scheme.lower() not in ("http", "https"):
        return False, f"Unsupported scheme '{parsed.scheme}'; only http and https are allowed"

    if parsed.username or parsed.password:
        return False, "URL credentials are not permitted"

    hostname = parsed.hostname
    if not hostname:
        return False, "URL has no valid hostname"

    hostname = hostname.lower().strip()

    # Reject localhost or single-label hostnames without a dot (unless IP)
    if hostname == "localhost" or ("." not in hostname and ":" not in hostname):
        return False, f"Invalid or local hostname '{hostname}'"

    # Check if hostname is direct IP address
    try:
        ip = ipaddress.ip_address(hostname)
        if is_ip_blocked(ip):
            return False, f"Direct IP '{hostname}' belongs to a private/reserved address space"
    except ValueError:
        pass

    # Resolve DNS to prevent SSRF against loopback/private network
    if resolve_dns:
        try:
            addr_info = socket.getaddrinfo(hostname, parsed.port or (443 if parsed.scheme == "https" else 80))
            if not addr_info:
                return False, f"Hostname '{hostname}' did not resolve to any IP address"

            for family, _, _, _, sockaddr in addr_info:
                ip_str = sockaddr[0]
                try:
                    resolved_ip = ipaddress.ip_address(ip_str)
                    if is_ip_blocked(resolved_ip):
                        return False, f"Hostname '{hostname}' resolves to private/blocked IP '{ip_str}'"
                except ValueError:
                    return False, f"Invalid IP '{ip_str}' returned by DNS resolver"
        except socket.gaierror as e:
            return False, f"DNS resolution failed for '{hostname}': {e}"
        except Exception as e:
            return False, f"Safety check error for '{hostname}': {e}"

    return True, ""


def normalize_hostname(hostname: str | None) -> str:
    """Normalize hostname by stripping port and leading 'www.'."""
    if not hostname:
        return ""
    host = hostname.split(":")[0].lower().strip()
    if host.startswith("www."):
        host = host[4:]
    return host


def is_same_domain(url: str, allowed_hostname: str) -> bool:
    """Check if URL belongs to the allowed competitor hostname (ignoring 'www.')."""
    try:
        parsed = urlparse(url)
        target_host = normalize_hostname(parsed.hostname)
        allowed = normalize_hostname(allowed_hostname)
        return target_host == allowed and bool(target_host)
    except Exception:
        return False


def is_ignored_path(path: str) -> bool:
    """Check if URL path should be excluded from crawling."""
    if not path:
        return False
    return bool(_IGNORE_PATH_REGEX.search(path))


def normalize_url(url: str) -> str:
    """
    Normalize URL:
    - Lowercase scheme and netloc.
    - Remove tracking query parameters.
    - Remove fragment (#...).
    - Normalize trailing slash (keep root '/', strip trailing slash for subpaths).
    """
    if not url:
        return ""

    parsed = urlparse(url.strip())
    scheme = parsed.scheme.lower()
    netloc = parsed.netloc.lower()

    # Clean path
    path = parsed.path or "/"
    path = re.sub(r"/+", "/", path)
    if len(path) > 1 and path.endswith("/"):
        path = path[:-1]

    # Clean query parameters
    filtered_query = []
    if parsed.query:
        for k, v in parse_qsl(parsed.query, keep_blank_values=False):
            if k.lower() not in TRACKING_PARAMS:
                filtered_query.append((k, v))
        filtered_query.sort(key=lambda x: x[0])

    query_str = urlencode(filtered_query) if filtered_query else ""

    return urlunparse((scheme, netloc, path, "", query_str, ""))
