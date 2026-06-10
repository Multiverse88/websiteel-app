import BadanUsahaTemplate from "@/components/layanan/BadanUsahaTemplate";
import { dataPT } from "@/data/layanan-badan-usaha";

export default function PendirianBadanUsaha() {
  return <BadanUsahaTemplate content={dataPT} />;
}
