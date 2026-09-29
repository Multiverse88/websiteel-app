import assert from "node:assert/strict";
import test from "node:test";
import { buildCampaignFonnteMessage } from "./campaign-leads";

test("Meta Ads lead receives Viani consultation follow-up copy", () => {
  assert.equal(
    buildCampaignFonnteMessage("Firly", "Layanan Lainnya"),
    "Halo Firly!\n\nTerima kasih sudah mengisi formulir dari meta ads. Perkenalkan, saya Viani yang akan segera membantu proses konsultasi layanan Layanan Lainnya 😊🙏\n\nJika ada hal yang ingin ditanyakan terlebih dahulu, silakan balas pesan ini, ya!",
  );
});
