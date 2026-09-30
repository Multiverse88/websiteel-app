import pytest
from utils.url_guard import is_safe_url, is_same_domain, is_ignored_path, normalize_url


def test_is_safe_url_valid():
    is_safe, reason = is_safe_url("https://example.com/layanan", resolve_dns=False)
    assert is_safe is True
    assert reason == ""

    is_safe, reason = is_safe_url("http://sub.domain.co.id/paket", resolve_dns=False)
    assert is_safe is True
    assert reason == ""


def test_is_safe_url_rejects_credentials():
    is_safe, reason = is_safe_url("https://admin:pass@example.com", resolve_dns=False)
    assert is_safe is False
    assert "credentials" in reason.lower()


def test_is_safe_url_rejects_non_http():
    is_safe, reason = is_safe_url("ftp://example.com", resolve_dns=False)
    assert is_safe is False
    assert "scheme" in reason.lower()

    is_safe, reason = is_safe_url("file:///etc/passwd", resolve_dns=False)
    assert is_safe is False


def test_is_safe_url_rejects_localhost_and_private_ips():
    is_safe, reason = is_safe_url("http://localhost:3000", resolve_dns=False)
    assert is_safe is False

    is_safe, reason = is_safe_url("http://127.0.0.1:8080", resolve_dns=False)
    assert is_safe is False
    assert "private" in reason.lower() or "reserved" in reason.lower()

    is_safe, reason = is_safe_url("http://192.168.1.10", resolve_dns=False)
    assert is_safe is False

    is_safe, reason = is_safe_url("http://10.0.0.1", resolve_dns=False)
    assert is_safe is False

    is_safe, reason = is_safe_url("http://169.254.169.254", resolve_dns=False)
    assert is_safe is False


def test_is_same_domain():
    assert is_same_domain("https://kompetitor.com/layanan", "kompetitor.com") is True
    assert is_same_domain("https://www.kompetitor.com/layanan", "kompetitor.com") is True
    assert is_same_domain("https://kompetitor.com/layanan", "www.kompetitor.com") is True
    assert is_same_domain("https://other.com/layanan", "kompetitor.com") is False
    assert is_same_domain("https://sub.kompetitor.com", "kompetitor.com") is False


def test_normalize_url():
    raw = "HTTPS://WWW.EXAMPLE.COM/layanan//paket/?utm_source=fb&utm_medium=cpc&id=123#section"
    expected = "https://www.example.com/layanan/paket?id=123"
    assert normalize_url(raw) == expected

    root = "https://example.com/"
    assert normalize_url(root) == "https://example.com/"


def test_is_ignored_path():
    assert is_ignored_path("/wp-admin/post.php") is True
    assert is_ignored_path("/login") is True
    assert is_ignored_path("/checkout") is True
    assert is_ignored_path("/assets/file.pdf") is True
    assert is_ignored_path("/images/hero.png") is True
    assert is_ignored_path("/layanan/pendirian-pt") is False
