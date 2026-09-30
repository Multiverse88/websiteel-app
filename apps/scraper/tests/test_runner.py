import unittest
import sys
import os

sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from tests.test_url_guard import (
    test_is_safe_url_valid,
    test_is_safe_url_rejects_credentials,
    test_is_safe_url_rejects_non_http,
    test_is_safe_url_rejects_localhost_and_private_ips,
    test_is_same_domain,
    test_normalize_url,
    test_is_ignored_path,
)
from tests.test_extractor import (
    test_extract_page_data_service,
    test_classify_page_unsupported_dynamic,
    test_extract_prices_various_formats,
    test_compute_content_hash_deterministic,
)
from tests.test_spider import SpiderTestCase


class ScraperUtilsTestCase(unittest.TestCase):
    def test_url_guard(self):
        test_is_safe_url_valid()
        test_is_safe_url_rejects_credentials()
        test_is_safe_url_rejects_non_http()
        test_is_safe_url_rejects_localhost_and_private_ips()
        test_is_same_domain()
        test_normalize_url()
        test_is_ignored_path()

    def test_extractor(self):
        test_extract_page_data_service()
        test_classify_page_unsupported_dynamic()
        test_extract_prices_various_formats()
        test_compute_content_hash_deterministic()


if __name__ == "__main__":
    unittest.main()
