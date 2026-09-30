import sys
import time

from worker import run_process_with_output


def test_run_process_with_output_enforces_timeout():
    started = time.monotonic()

    return_code, output, timed_out = run_process_with_output(
        [sys.executable, "-u", "-c", "import time; print('started'); time.sleep(10)"],
        timeout_seconds=0.1,
    )

    assert time.monotonic() - started < 2
    assert timed_out is True
    assert return_code != 0
    assert "started" in output
