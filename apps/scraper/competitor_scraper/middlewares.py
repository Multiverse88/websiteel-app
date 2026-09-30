"""
Scrapy downloader middlewares enforcing domain bounds and SSRF prevention.
"""

from urllib.parse import urlparse
from scrapy.exceptions import IgnoreRequest
from utils.url_guard import is_safe_url, is_same_domain, is_ignored_path


class SafeUrlDownloaderMiddleware:
    """Downloader middleware to block requests to private IPs, cross-domains, or ignored paths."""

    def process_request(self, request, spider):
        url = request.url

        # robots.txt and sitemaps are allowed to proceed
        if url.endswith("/robots.txt") or "/sitemap" in url.lower():
            return None

        # Verify target is on allowed competitor domain
        allowed_hostname = getattr(spider, "allowed_hostname", None)
        if allowed_hostname and not is_same_domain(url, allowed_hostname):
            raise IgnoreRequest(f"URL '{url}' is outside allowed domain '{allowed_hostname}'")

        # Check path exclusions (binary files, admin/login paths)
        parsed = urlparse(url)
        if is_ignored_path(parsed.path):
            raise IgnoreRequest(f"Path '{parsed.path}' is in ignored pattern list")

        # Check URL safety (syntax, credentials, private IPs)
        is_safe, reason = is_safe_url(url, resolve_dns=False)
        if not is_safe:
            raise IgnoreRequest(f"Blocked unsafe URL '{url}': {reason}")

        return None

    def process_response(self, request, response, spider):
        # Validate redirected response destination
        if response.url != request.url:
            allowed_hostname = getattr(spider, "allowed_hostname", None)
            if allowed_hostname and not is_same_domain(response.url, allowed_hostname):
                raise IgnoreRequest(f"Redirected to outside domain: '{response.url}'")

            is_safe, reason = is_safe_url(response.url, resolve_dns=True)
            if not is_safe:
                raise IgnoreRequest(f"Redirect destination is unsafe '{response.url}': {reason}")

        return response
