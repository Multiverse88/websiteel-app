import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('Seeding dummy tracking projects...')

  const dummyProjects = [
    {
      trackingCode: 'EL-2026-001',
      clientName: 'PT Teknologi Masa Depan',
      serviceType: 'Pendirian PT',
      isCompleted: false,
      timelineData: [
        { id: '1', title: 'Pemberkasan Dokumen', status: 'done', date: '2026-08-01' },
        { id: '2', title: 'Pengecekan Nama PT', status: 'done', date: '2026-08-03' },
        { id: '3', title: 'Drafting Akta Notaris', status: 'current', date: '2026-08-05' },
        { id: '4', title: 'Tanda Tangan Akta', status: 'pending', date: null },
        { id: '5', title: 'SK Kemenkumham Terbit', status: 'pending', date: null },
        { id: '6', title: 'NIB & Izin Usaha Terbit', status: 'pending', date: null },
        { id: '7', title: 'Penyerahan Dokumen', status: 'pending', date: null },
      ],
    },
    {
      trackingCode: 'EL-2026-002',
      clientName: 'CV Maju Bersama',
      serviceType: 'Pendirian CV',
      isCompleted: true,
      timelineData: [
        { id: '1', title: 'Pemberkasan Dokumen', status: 'done', date: '2026-07-10' },
        { id: '2', title: 'Pengecekan Nama CV', status: 'done', date: '2026-07-12' },
        { id: '3', title: 'Drafting Akta Notaris', status: 'done', date: '2026-07-15' },
        { id: '4', title: 'Tanda Tangan Akta', status: 'done', date: '2026-07-18' },
        { id: '5', title: 'SK Kemenkumham Terbit', status: 'done', date: '2026-07-22' },
        { id: '6', title: 'NIB & Izin Usaha Terbit', status: 'done', date: '2026-07-25' },
        { id: '7', title: 'Penyerahan Dokumen', status: 'done', date: '2026-07-28' },
      ],
    },
    {
      trackingCode: 'EL-2026-003',
      clientName: 'Kopi Kenangan Senja',
      serviceType: 'Pendaftaran Merek',
      isCompleted: false,
      timelineData: [
        { id: '1', title: 'Pemberkasan & Pengecekan', status: 'done', date: '2026-06-01' },
        { id: '2', title: 'Pendaftaran DJKI', status: 'done', date: '2026-06-10' },
        { id: '3', title: 'Pemeriksaan Formalitas', status: 'current', date: '2026-08-01' },
        { id: '4', title: 'Masa Pengumuman', status: 'pending', date: null },
        { id: '5', title: 'Pemeriksaan Substantif', status: 'pending', date: null },
        { id: '6', title: 'Sertifikat Merek Terbit', status: 'pending', date: null },
      ],
    }
  ]

  for (const project of dummyProjects) {
    await prisma.trackingProject.upsert({
      where: { trackingCode: project.trackingCode },
      update: {},
      create: project,
    })
  }

  console.log('Dummy tracking projects created!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
