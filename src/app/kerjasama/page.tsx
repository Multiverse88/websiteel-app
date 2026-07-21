"use client";

import React, { useState } from "react";
import Link from "next/link";
import { submitPartnershipForm } from "./actions";
import {
  Check,
  Handshake,
  Users,
  User,
  Code,
  Activity,
  Briefcase,
  TrendingUp,
  Mail,
  Phone,
  ArrowRight,
  MessageSquare,
  Building,
  ShieldCheck,
  Award,
  Globe,
  Home,
  CheckCircle2,
  Upload,
  Send
} from "lucide-react";
import { getWhatsAppLink } from "@/lib/config";

export default function KerjasamaPage() {
  // Form submission state
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    email: "",
    whatsapp: "",
    companyName: "",
    businessActivity: "",
    website: "",
    officeAddress: "",
    partnershipType: "Pilih Jenis Kerjasama",
    proposal: "",
    source: "Pilih"
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [step, setStep] = useState(1);

  const nextStep = () => {
    let stepErrors: Record<string, string> = {};
    if (step === 1) {
      if (!formData.name.trim()) stepErrors.name = "Nama lengkap wajib diisi.";
      if (!formData.role.trim()) stepErrors.role = "Jabatan wajib diisi.";
      if (!formData.email.trim()) stepErrors.email = "Alamat email wajib diisi.";
      if (!formData.whatsapp.trim()) stepErrors.whatsapp = "Nomor WhatsApp wajib diisi.";
    } else if (step === 2) {
      if (!formData.companyName.trim()) stepErrors.companyName = "Nama perusahaan wajib diisi.";
    }
    
    if (Object.keys(stepErrors).length > 0) {
      setErrors(stepErrors);
      return;
    }
    setErrors({});
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = "Nama lengkap wajib diisi.";
    if (!formData.role.trim()) newErrors.role = "Jabatan wajib diisi.";
    if (!formData.email.trim()) {
      newErrors.email = "Email bisnis wajib diisi.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Format email tidak valid.";
    }
    if (!formData.whatsapp.trim()) {
      newErrors.whatsapp = "Nomor WhatsApp wajib diisi.";
    } else if (formData.whatsapp.length < 9) {
      newErrors.whatsapp = "Nomor WhatsApp terlalu pendek.";
    }
    if (!formData.companyName.trim()) newErrors.companyName = "Nama pendirian/perusahaan wajib diisi.";
    if (!formData.businessActivity.trim()) newErrors.businessActivity = "Kegiatan usaha wajib diisi.";
    if (formData.partnershipType === "Pilih Jenis Kerjasama") {
      newErrors.partnershipType = "Pilih jenis kerjasama yang diminati.";
    }
    if (!formData.proposal.trim()) newErrors.proposal = "Pesan tambahan wajib diisi.";
    if (formData.source === "Pilih" || !formData.source) {
      newErrors.source = "Pilih sumber informasi.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    setErrors({});
    
    const result = await submitPartnershipForm(formData);
    
    setIsSubmitting(false);
    
    if (result.error) {
      alert(result.error);
    } else {
      setIsSuccess(true);
    }
  };

  const scrollToForm = (e: React.MouseEvent) => {
    e.preventDefault();
    const element = document.getElementById("formulir-mitra");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#FCFBFA] text-gray-900 font-sans">
      
      {/* ─── 1. HERO SECTION ─── */}
      <section className="bg-white pt-8 lg:pt-12 pb-24 relative overflow-hidden">
        {/* Soft Modern Radial Gradient Spots matching screenshot exactly */}
        <div 
          className="absolute -left-[150px] sm:-left-[250px] top-1/2 -translate-y-1/2 w-[500px] sm:w-[800px] aspect-square rounded-full pointer-events-none z-0" 
          style={{
            background: "radial-gradient(circle, rgba(253, 218, 222, 0.45) 0%, rgba(253, 218, 222, 0) 70%)",
            filter: "blur(40px)",
          }}
        />
        <div 
          className="absolute -right-[150px] sm:-right-[250px] top-1/2 -translate-y-1/2 w-[500px] sm:w-[800px] aspect-square rounded-full pointer-events-none z-0" 
          style={{
            background: "radial-gradient(circle, rgba(254, 240, 138, 0.35) 0%, rgba(254, 240, 138, 0) 70%)",
            filter: "blur(40px)",
          }}
        />

        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-6.5 flex flex-col items-center">
          {/* Badge Pill */}
          <div className="inline-flex items-center space-x-2 bg-white py-1.5 px-4 rounded-full shadow-md border border-black/[0.03] shadow-[0_2px_12px_rgba(0,0,0,0.015)] mb-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#990202]" />
            <span className="text-[16px] font-black text-[#990202] tracking-wider">Program Kerjasama B2B</span>
          </div>

          {/* Headline */}
          <h1 className="font-heading text-[42px] sm:text-[54px] font-black text-gray-900 leading-[1.12] tracking-tight max-w-4xl">
            Mari tumbuh bersama.
          </h1>

          {/* Subtitle */}
          <p className="text-[16px] sm:text-[16px] text-gray-500 leading-relaxed max-w-2xl font-normal">
            Buka peluang kemitraan strategis dengan EasyLegal — dirancang untuk perusahaan, agency, &amp; partner institusional.
          </p>

          {/* Action buttons */}
          <div className="flex flex-row justify-center items-center gap-4 pt-3.5 w-full">
            <a
              href="#formulir-mitra"
              onClick={scrollToForm}
              className="inline-flex items-center justify-center px-7 py-3.5 bg-[#990202] hover:bg-[#800000] text-white font-extrabold text-[16px] rounded-xl shadow-md hover:shadow-lg transition-all duration-200 text-center cursor-pointer"
            >
              Ajukan Kerjasama
            </a>
            <a
              href="#program-mitra"
              onClick={(e) => {
                e.preventDefault();
                const element = document.getElementById("program-mitra");
                if (element) {
                  element.scrollIntoView({ behavior: "smooth" });
                }
              }}
              className="inline-flex items-center justify-center px-7 py-3.5 shadow-md border border-black/[0.04] text-gray-800 font-extrabold text-[16px] rounded-xl bg-white hover:bg-gray-50 transition-all duration-200 text-center shadow-sm cursor-pointer"
            >
              Lihat Jenis Mitra
            </a>
          </div>

          {/* Centered Checkpoints Row in white rounded-full pill */}
          <div className="pt-6">
            <div className="inline-flex flex-col sm:flex-row items-center sm:space-x-8 space-y-2 sm:space-y-0 bg-white shadow-md border border-black/[0.03] py-3.5 px-8 rounded-full shadow-[0_4px_16px_rgba(0,0,0,0.015)]">
              {/* Checkpoint 1 */}
              <div className="flex items-center space-x-1.5 text-[16px] sm:text-[16px] text-gray-500 font-semibold">
                <Check className="w-3.5 h-3.5 text-[#990202]" strokeWidth={4} />
                <span><strong className="font-extrabold text-gray-900">50+</strong> mitra aktif</span>
              </div>
              {/* Checkpoint 2 */}
              <div className="flex items-center space-x-1.5 text-[16px] sm:text-[16px] text-gray-500 font-semibold">
                <Check className="w-3.5 h-3.5 text-[#990202]" strokeWidth={4} />
                <span>Respons <strong className="font-extrabold text-gray-900">1–3 hari</strong></span>
              </div>
              {/* Checkpoint 3 */}
              <div className="flex items-center space-x-1.5 text-[16px] sm:text-[16px] text-gray-500 font-semibold">
                <Check className="w-3.5 h-3.5 text-[#990202]" strokeWidth={4} />
                <span><strong className="font-extrabold text-gray-900">MOU</strong> resmi</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 2. PROGRAMS SECTION ─── */}
      <section id="program-mitra" className="py-20 bg-white">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <p className="text-[16px] font-extrabold text-[#990202] uppercase tracking-[0.2em] font-sans">JENIS KERJASAMA</p>
            <h2 className="font-heading text-[34px] sm:text-[40px] font-black text-gray-900 leading-tight tracking-tight">
              4 model <span className="text-[#990202]">kemitraan.</span>
            </h2>
          </div>

          {/* Cards Grid (4 Columns) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-[1140px] mx-auto items-stretch">
            
            {/* Card 1 */}
            <div className="bg-white rounded-[20px] p-6.5 shadow-[0_0_0_1px_rgba(0,0,0,0.03),_0_8px_30px_rgba(0,0,0,0.03)] hover:shadow-[0_0_0_1px_rgba(153,2,2,0.08),_0_15px_40px_rgba(153,2,2,0.05)] transition-all duration-300 flex flex-col items-center justify-center text-center hover:-translate-y-0.5">
              {/* Premium Dotted Double-Ring Icon Container */}
              <div className="w-14 h-14 rounded-full border border-dashed border-red-300 bg-[#FFF5F5] flex items-center justify-center mx-auto shadow-sm">
                <div className="w-10 h-10 rounded-full bg-red-100/50 flex items-center justify-center">
                  <Building className="w-5 h-5 text-[#990202]" />
                </div>
              </div>
              <h3 className="text-[16px] font-black text-gray-900 mt-4">Corporate Partnership</h3>
              <p className="text-[16px] text-gray-500 font-normal leading-relaxed mt-2 max-w-[210px]">
                Layanan B2B untuk korporasi volume tinggi.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-white rounded-[20px] p-6.5 shadow-[0_0_0_1px_rgba(0,0,0,0.03),_0_8px_30px_rgba(0,0,0,0.03)] hover:shadow-[0_0_0_1px_rgba(153,2,2,0.08),_0_15px_40px_rgba(153,2,2,0.05)] transition-all duration-300 flex flex-col items-center justify-center text-center hover:-translate-y-0.5">
              {/* Premium Dotted Double-Ring Icon Container */}
              <div className="w-14 h-14 rounded-full border border-dashed border-red-300 bg-[#FFF5F5] flex items-center justify-center mx-auto shadow-sm">
                <div className="w-10 h-10 rounded-full bg-red-100/50 flex items-center justify-center">
                  <User className="w-5 h-5 text-[#990202]" />
                </div>
              </div>
              <h3 className="text-[16px] font-black text-gray-900 mt-4">Reseller Agency</h3>
              <p className="text-[16px] text-gray-500 font-normal leading-relaxed mt-2 max-w-[210px]">
                Untuk konsultan / agency dengan basis klien aktif.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-white rounded-[20px] p-6.5 shadow-[0_0_0_1px_rgba(0,0,0,0.03),_0_8px_30px_rgba(0,0,0,0.03)] hover:shadow-[0_0_0_1px_rgba(153,2,2,0.08),_0_15px_40px_rgba(153,2,2,0.05)] transition-all duration-300 flex flex-col items-center justify-center text-center hover:-translate-y-0.5">
              {/* Premium Dotted Double-Ring Icon Container */}
              <div className="w-14 h-14 rounded-full border border-dashed border-red-300 bg-[#FFF5F5] flex items-center justify-center mx-auto shadow-sm">
                <div className="w-10 h-10 rounded-full bg-red-100/50 flex items-center justify-center">
                  <Code className="w-5 h-5 text-[#990202]" />
                </div>
              </div>
              <h3 className="text-[16px] font-black text-gray-900 mt-4">API &amp; Integration</h3>
              <p className="text-[16px] text-gray-500 font-normal leading-relaxed mt-2 max-w-[210px]">
                Embed layanan legal ke platform SaaS via API.
              </p>
            </div>

            {/* Card 4 */}
            <div className="bg-white rounded-[20px] p-6.5 shadow-[0_0_0_1px_rgba(0,0,0,0.03),_0_8px_30px_rgba(0,0,0,0.03)] hover:shadow-[0_0_0_1px_rgba(153,2,2,0.08),_0_15px_40px_rgba(153,2,2,0.05)] transition-all duration-300 flex flex-col items-center justify-center text-center hover:-translate-y-0.5">
              {/* Premium Dotted Double-Ring Icon Container */}
              <div className="w-14 h-14 rounded-full border border-dashed border-red-300 bg-[#FFF5F5] flex items-center justify-center mx-auto shadow-sm">
                <div className="w-10 h-10 rounded-full bg-red-100/50 flex items-center justify-center">
                  <Activity className="w-5 h-5 text-[#990202]" />
                </div>
              </div>
              <h3 className="text-[16px] font-black text-gray-900 mt-4">Co-Marketing</h3>
              <p className="text-[16px] text-gray-500 font-normal leading-relaxed mt-2 max-w-[210px]">
                Kolaborasi konten, webinar, &amp; brand campaign.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* ─── 3. CARA KERJA SECTION ─── */}
      <section className="py-20 bg-white">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
          
          {/* Section Header */}
          <div className="max-w-3xl mx-auto mb-16 space-y-3">
            <p className="text-[16px] font-extrabold text-[#990202] uppercase tracking-[0.2em] font-sans">CARA KERJA</p>
            <h2 className="font-heading text-[34px] sm:text-[38px] font-black text-gray-900 leading-tight tracking-tight">
              3 langkah, <span className="text-[#990202]">kolaborasi dimulai.</span>
            </h2>
          </div>

          {/* Steps Container */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-4 max-w-[1000px] mx-auto">
            
            {/* Step 1 */}
            <div className="bg-white rounded-[20px] py-10 px-6 shadow-[0_0_0_1px_rgba(0,0,0,0.03),_0_10px_35px_rgba(0,0,0,0.03)] hover:shadow-[0_0_0_1px_rgba(153,2,2,0.08),_0_15px_45px_rgba(153,2,2,0.05)] transition-all duration-300 flex flex-col items-center text-center w-full md:w-[280px] min-h-[220px] justify-center relative hover:-translate-y-0.5">
              <div className="w-12 h-12 rounded-full bg-[#990202] text-white flex items-center justify-center font-black text-[16px] shadow-[0_5px_15px_rgba(153,2,2,0.35)] mb-5">
                1
              </div>
              <h3 className="text-[16px] font-black text-gray-900 leading-tight">Submit Form</h3>
              <p className="text-[16px] text-gray-500 font-normal leading-relaxed mt-2.5 max-w-[210px]">
                Isi formulir dengan detail bisnis &amp; proposal.
              </p>
            </div>

            {/* Arrow 1 */}
            <div className="hidden md:flex items-center justify-center px-2">
              <svg className="w-5 h-5 text-gray-300" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </div>

            {/* Step 2 */}
            <div className="bg-white rounded-[20px] py-10 px-6 shadow-[0_0_0_1px_rgba(0,0,0,0.03),_0_10px_35px_rgba(0,0,0,0.03)] hover:shadow-[0_0_0_1px_rgba(153,2,2,0.08),_0_15px_45px_rgba(153,2,2,0.05)] transition-all duration-300 flex flex-col items-center text-center w-full md:w-[280px] min-h-[220px] justify-center relative hover:-translate-y-0.5">
              <div className="w-12 h-12 rounded-full bg-[#990202] text-white flex items-center justify-center font-black text-[16px] shadow-[0_5px_15px_rgba(153,2,2,0.35)] mb-5">
                2
              </div>
              <h3 className="text-[16px] font-black text-gray-900 leading-tight">Diskusi Tim</h3>
              <p className="text-[16px] text-gray-500 font-normal leading-relaxed mt-2.5 max-w-[210px]">
                Discovery meeting &amp; negosiasi terms dalam 1 minggu.
              </p>
            </div>

            {/* Arrow 2 */}
            <div className="hidden md:flex items-center justify-center px-2">
              <svg className="w-5 h-5 text-gray-300" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </div>

            {/* Step 3 */}
            <div className="bg-white rounded-[20px] py-10 px-6 shadow-[0_0_0_1px_rgba(0,0,0,0.03),_0_10px_35px_rgba(0,0,0,0.03)] hover:shadow-[0_0_0_1px_rgba(153,2,2,0.08),_0_15px_45px_rgba(153,2,2,0.05)] transition-all duration-300 flex flex-col items-center text-center w-full md:w-[280px] min-h-[220px] justify-center relative hover:-translate-y-0.5">
              <div className="w-12 h-12 rounded-full bg-[#990202] text-white flex items-center justify-center font-black text-[16px] shadow-[0_5px_15px_rgba(153,2,2,0.35)] mb-5">
                3
              </div>
              <h3 className="text-[16px] font-black text-gray-900 leading-tight">Sign MOU</h3>
              <p className="text-[16px] text-gray-500 font-normal leading-relaxed mt-2.5 max-w-[210px]">
                Tanda tangan MOU resmi &amp; mulai onboarding.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* ─── 4. FORM SECTION ─── */}
      <section id="formulir-mitra" className="bg-[#FCFBFA] py-24 scroll-mt-16">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
            <p className="text-[16px] font-extrabold text-[#990202] uppercase tracking-[0.2em] font-sans">FORMULIR PENGAJUAN</p>
            <h2 className="font-heading text-[34px] sm:text-[38px] font-black text-gray-900 leading-tight tracking-tight">
              Ajukan kerjasama.
            </h2>
            <p className="text-[16px] text-gray-500 font-medium leading-relaxed">
              Tim partnership respons dalam <strong className="font-extrabold text-gray-900">1–3 hari kerja</strong>.
            </p>
          </div>

          <div className="max-w-[760px] mx-auto bg-white rounded-[32px] p-6 sm:p-12 shadow-[0_0_0_1px_rgba(0,0,0,0.03),_0_15px_50px_rgba(0,0,0,0.03)] relative">
            
            {/* Visual red corner badge */}
            <div className="absolute -top-1 right-8 w-12 h-2 bg-[#990202] rounded-b-full" />

            {!isSuccess ? (
              <form onSubmit={handleSubmit} className="space-y-8">
                
                {/* Stepper */}
                <div className="flex items-center justify-center mb-10 mt-2">
                  <div className="flex items-center">
                    <div className="flex flex-col items-center">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-[16px] ${step >= 1 ? 'bg-[#990202] text-white' : 'bg-white border-2 border-gray-300 text-gray-400'}`}>
                        {step > 1 ? <Check className="w-5 h-5 text-white" strokeWidth={3} /> : '1'}
                      </div>
                      <span className={`text-[16px] font-bold mt-2.5 uppercase tracking-widest ${step === 1 ? 'text-[#990202]' : step > 1 ? 'text-gray-900' : 'text-gray-400'}`}>TENTANG ANDA</span>
                    </div>
                    <div className={`w-12 sm:w-20 h-[1.5px] mx-1 sm:mx-3 mb-6 ${step >= 2 ? 'bg-[#990202]' : 'bg-gray-300'}`} />
                    <div className="flex flex-col items-center">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-[16px] ${step >= 2 ? 'bg-[#990202] text-white' : 'bg-white border-2 border-gray-300 text-gray-400'}`}>
                        {step > 2 ? <Check className="w-5 h-5 text-white" strokeWidth={3} /> : '2'}
                      </div>
                      <span className={`text-[16px] font-bold mt-2.5 uppercase tracking-widest ${step === 2 ? 'text-[#990202]' : step > 2 ? 'text-gray-900' : 'text-gray-400'}`}>TENTANG USAHA</span>
                    </div>
                    <div className={`w-12 sm:w-20 h-[1.5px] mx-1 sm:mx-3 mb-6 ${step >= 3 ? 'bg-[#990202]' : 'bg-gray-300'}`} />
                    <div className="flex flex-col items-center">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-[16px] ${step >= 3 ? 'bg-[#990202] text-white' : 'bg-white border-2 border-gray-300 text-gray-400'}`}>
                        3
                      </div>
                      <span className={`text-[16px] font-bold mt-2.5 uppercase tracking-widest ${step === 3 ? 'text-[#990202]' : 'text-gray-400'}`}>DETAIL KERJASAMA</span>
                    </div>
                  </div>
                </div>

                {/* STEP 1 */}
                {step === 1 && (
                  <div className="animate-fade-in space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      {/* Nama Lengkap */}
                      <div className="space-y-1.5 text-left">
                        <label htmlFor="name" className="text-[16px] font-bold text-gray-900">
                          Nama Lengkap<span className="text-[#990202]">*</span>
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-3 rounded-xl border ${
                            errors.name ? "border-red-500 bg-red-50/5" : "border-transparent bg-[#F9F9F9] focus:border-gray-200 focus:bg-white"
                          } text-[16px] font-medium text-gray-900 focus:outline-none transition-colors`}
                          placeholder="Nama lengkap"
                        />
                        {errors.name && <span className="text-[16px] font-bold text-red-500">{errors.name}</span>}
                      </div>

                      {/* Jabatan */}
                      <div className="space-y-1.5 text-left">
                        <label htmlFor="role" className="text-[16px] font-bold text-gray-900">
                          Jabatan<span className="text-[#990202]">*</span>
                        </label>
                        <input
                          type="text"
                          id="role"
                          name="role"
                          value={formData.role}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-3 rounded-xl border ${
                            errors.role ? "border-red-500 bg-red-50/5" : "border-transparent bg-[#F9F9F9] focus:border-gray-200 focus:bg-white"
                          } text-[16px] font-medium text-gray-900 focus:outline-none transition-colors`}
                          placeholder="Direktur / Notaris / Founder ..."
                        />
                        {errors.role && <span className="text-[16px] font-bold text-red-500">{errors.role}</span>}
                      </div>

                      {/* Alamat Email */}
                      <div className="space-y-1.5 text-left">
                        <label htmlFor="email" className="text-[16px] font-bold text-gray-900">
                          Alamat Email<span className="text-[#990202]">*</span>
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-3 rounded-xl border ${
                            errors.email ? "border-red-500 bg-red-50/5" : "border-transparent bg-[#F9F9F9] focus:border-gray-200 focus:bg-white"
                          } text-[16px] font-medium text-gray-900 focus:outline-none transition-colors`}
                          placeholder="nama@email.com"
                        />
                        {errors.email && <span className="text-[16px] font-bold text-red-500">{errors.email}</span>}
                      </div>

                      {/* No. WhatsApp */}
                      <div className="space-y-1.5 text-left">
                        <label htmlFor="whatsapp" className="text-[16px] font-bold text-gray-900">
                          Nomor WhatsApp<span className="text-[#990202]">*</span>
                        </label>
                        <input
                          type="tel"
                          id="whatsapp"
                          name="whatsapp"
                          value={formData.whatsapp}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-3 rounded-xl border ${
                            errors.whatsapp ? "border-red-500 bg-red-50/5" : "border-transparent bg-[#F9F9F9] focus:border-gray-200 focus:bg-white"
                          } text-[16px] font-medium text-gray-900 focus:outline-none transition-colors`}
                          placeholder="0812xxxxxxxx"
                        />
                        {errors.whatsapp && <span className="text-[16px] font-bold text-red-500">{errors.whatsapp}</span>}
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={nextStep}
                      className="w-full mt-6 py-4 bg-[#990202] hover:bg-[#800000] text-white font-bold text-[16px] rounded-xl shadow-md transition-all flex justify-center items-center gap-2 group"
                    >
                      Lanjut <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                    </button>
                  </div>
                )}

                {/* STEP 2 */}
                {step === 2 && (
                  <div className="animate-fade-in space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      {/* Nama Pendirian / Perusahaan */}
                      <div className="space-y-1.5 text-left">
                        <label htmlFor="companyName" className="text-[16px] font-bold text-gray-900">
                          Nama Pendirian / Perusahaan<span className="text-[#990202]">*</span>
                        </label>
                        <input
                          type="text"
                          id="companyName"
                          name="companyName"
                          value={formData.companyName}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-3 rounded-xl border ${
                            errors.companyName ? "border-red-500 bg-red-50/5" : "border-transparent bg-[#F9F9F9] focus:border-gray-200 focus:bg-white"
                          } text-[16px] font-medium text-gray-900 focus:outline-none transition-colors`}
                          placeholder="PT / CV / Kantor Notaris ..."
                        />
                        {errors.companyName && <span className="text-[16px] font-bold text-red-500">{errors.companyName}</span>}
                      </div>

                      {/* Nama Kegiatan Usaha */}
                      <div className="space-y-1.5 text-left">
                        <label htmlFor="businessActivity" className="text-[16px] font-bold text-gray-900">
                          Nama Kegiatan Usaha<span className="text-[#990202]">*</span>
                        </label>
                        <input
                          type="text"
                          id="businessActivity"
                          name="businessActivity"
                          value={formData.businessActivity}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-3 rounded-xl border ${
                            errors.businessActivity ? "border-red-500 bg-red-50/5" : "border-transparent bg-[#F9F9F9] focus:border-gray-200 focus:bg-white"
                          } text-[16px] font-medium text-gray-900 focus:outline-none transition-colors`}
                          placeholder="mis. Notaris / Jasa Legalitas"
                        />
                        {errors.businessActivity && <span className="text-[16px] font-bold text-red-500">{errors.businessActivity}</span>}
                      </div>

                      {/* Alamat Website */}
                      <div className="space-y-1.5 text-left">
                        <label htmlFor="website" className="text-[16px] font-bold text-gray-900">
                          Alamat Website
                        </label>
                        <input
                          type="text"
                          id="website"
                          name="website"
                          value={formData.website}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 rounded-xl border border-transparent focus:border-gray-200 bg-[#F9F9F9] focus:bg-white text-[16px] font-medium text-gray-900 focus:outline-none transition-colors"
                          placeholder="https://usaha-anda.com"
                        />
                      </div>

                      {/* Alamat Kantor */}
                      <div className="space-y-1.5 text-left">
                        <label htmlFor="officeAddress" className="text-[16px] font-bold text-gray-900">
                          Alamat Kantor
                        </label>
                        <input
                          type="text"
                          id="officeAddress"
                          name="officeAddress"
                          value={formData.officeAddress}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 rounded-xl border border-transparent focus:border-gray-200 bg-[#F9F9F9] focus:bg-white text-[16px] font-medium text-gray-900 focus:outline-none transition-colors"
                          placeholder="Kota / alamat lengkap"
                        />
                      </div>
                    </div>

                    <div className="flex gap-4 mt-6">
                      <button
                        type="button"
                        onClick={prevStep}
                        className="w-1/3 py-4 bg-white border border-gray-200 hover:bg-gray-50 text-gray-900 font-bold text-[16px] rounded-xl shadow-sm transition-all flex justify-center items-center gap-2 group"
                      >
                        <ArrowRight className="w-5 h-5 transform rotate-180 transition-transform group-hover:-translate-x-1" />
                        Kembali
                      </button>
                      <button
                        type="button"
                        onClick={nextStep}
                        className="w-2/3 py-4 bg-[#990202] hover:bg-[#800000] text-white font-bold text-[16px] rounded-xl shadow-md transition-all flex justify-center items-center gap-2 group"
                      >
                        Lanjut <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                      </button>
                    </div>
                  </div>
                )}

                {/* STEP 3 */}
                {step === 3 && (
                  <div className="animate-fade-in space-y-6">
                    <div className="space-y-5">
                      {/* Jenis Kerjasama */}
                      <div className="space-y-1.5 text-left">
                        <label htmlFor="partnershipType" className="text-[16px] font-bold text-gray-900">
                          Jenis Kerjasama<span className="text-[#990202]">*</span>
                        </label>
                        <div className="relative">
                          <select
                            id="partnershipType"
                            name="partnershipType"
                            value={formData.partnershipType}
                            onChange={handleInputChange}
                            className={`w-full px-4 py-3 rounded-xl border appearance-none cursor-pointer ${
                              errors.partnershipType ? "border-red-500 bg-red-50/5" : "border-transparent focus:border-gray-200 bg-[#F9F9F9] focus:bg-white"
                            } text-[16px] font-medium text-gray-900 focus:outline-none`}
                          >
                            <option value="Pilih Jenis Kerjasama">Pilih Jenis Kerjasama</option>
                            <option value="Corporate Partnership">Corporate Partnership</option>
                            <option value="Reseller Agency">Reseller Agency</option>
                            <option value="API & Integration">API &amp; Integration</option>
                            <option value="Co-Marketing">Co-Marketing</option>
                          </select>
                          <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-gray-550">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                            </svg>
                          </div>
                        </div>
                        {errors.partnershipType && <span className="text-[16px] font-bold text-red-500">{errors.partnershipType}</span>}
                      </div>

                      {/* Pesan Tambahan */}
                      <div className="space-y-1.5 text-left">
                        <label htmlFor="proposal" className="text-[16px] font-bold text-gray-900">
                          Pesan Tambahan<span className="text-[#990202]">*</span>
                        </label>
                        <textarea
                          id="proposal"
                          name="proposal"
                          value={formData.proposal}
                          onChange={handleInputChange}
                          rows={4}
                          className={`w-full px-4 py-3 rounded-xl border ${
                            errors.proposal ? "border-red-500 bg-red-50/5" : "border-transparent focus:border-gray-200 bg-[#F9F9F9] focus:bg-white"
                          } text-[16px] font-medium text-gray-900 focus:outline-none resize-none transition-colors`}
                          placeholder="Pesan untuk kerjasama & value yang ingin disampaikan (singkat saja)..."
                        />
                        {errors.proposal && <span className="text-[16px] font-bold text-red-500">{errors.proposal}</span>}
                      </div>

                      {/* Upload Berkas Kerjasama */}
                      <div className="space-y-1.5 text-left">
                        <label className="text-[16px] font-bold text-gray-900">
                          Upload Berkas Kerjasama / Proposal
                        </label>
                        <div className="w-full border border-dashed border-gray-400 bg-[#F9F9F9] rounded-xl p-5 flex items-center gap-4 cursor-pointer hover:bg-gray-50 transition-colors">
                          <Upload className="w-6 h-6 text-[#990202]" />
                          <div className="flex flex-col">
                            <span className="text-[16px] font-bold text-gray-900">Klik untuk upload berkas</span>
                            <span className="text-[16px] text-gray-500">PDF, DOC, atau gambar — maks 10MB</span>
                          </div>
                        </div>
                      </div>

                      {/* Dari mana Anda mengetahui EasyLegal? */}
                      <div className="space-y-1.5 text-left">
                        <label htmlFor="source" className="text-[16px] font-bold text-gray-900">
                          Dari mana Anda mengetahui EasyLegal?<span className="text-[#990202]">*</span>
                        </label>
                        <div className="relative">
                          <select
                            id="source"
                            name="source"
                            value={formData.source}
                            onChange={handleInputChange}
                            className={`w-full px-4 py-3 rounded-xl border appearance-none cursor-pointer ${
                              errors.source ? "border-red-500 bg-red-50/5" : "border-transparent focus:border-gray-200 bg-[#F9F9F9] focus:bg-white"
                            } text-[16px] font-medium text-gray-900 focus:outline-none`}
                          >
                            <option value="Pilih">Pilih</option>
                            <option value="Pencarian Google">Pencarian Google</option>
                            <option value="Instagram">Instagram</option>
                            <option value="LinkedIn">LinkedIn</option>
                            <option value="Referensi Teman/Kolega">Referensi Teman/Kolega</option>
                            <option value="Lainnya">Lainnya</option>
                          </select>
                          <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-gray-550">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                            </svg>
                          </div>
                        </div>
                        {errors.source && <span className="text-[16px] font-bold text-red-500">{errors.source}</span>}
                      </div>
                    </div>

                    {/* Privacy Disclaimer */}
                    <div className="bg-[#F9F9F9] rounded-xl p-4 border border-gray-100 text-left mt-2">
                      <p className="text-[16px] sm:text-[16px] text-gray-500 font-medium leading-relaxed">
                        Saya menyetujui EasyLegal memproses data ini untuk follow-up kerjasama sesuai <span className="font-bold text-[#990202]">Kebijakan Privasi</span>.
                      </p>
                    </div>

                    <div className="flex gap-4 mt-6">
                      <button
                        type="button"
                        onClick={prevStep}
                        className="w-1/3 py-4 bg-white border border-gray-200 hover:bg-gray-50 text-gray-900 font-bold text-[16px] rounded-xl shadow-sm transition-all flex justify-center items-center gap-2 group"
                      >
                        <ArrowRight className="w-5 h-5 transform rotate-180 transition-transform group-hover:-translate-x-1" />
                        Kembali
                      </button>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-2/3 py-4 bg-[#990202] hover:bg-[#800000] text-white font-bold text-[16px] rounded-xl shadow-[0_4px_12px_rgba(153,2,2,0.2)] hover:shadow-[0_6px_16px_rgba(153,2,2,0.3)] transition-all flex justify-center items-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed"
                      >
                        {isSubmitting ? (
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        ) : (
                          <>
                            Kirim Pengajuan
                            <Send className="w-4 h-4 transition-transform group-hover:translate-x-1 -mt-0.5" />
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                )}

              </form>
            ) : (
              // Immersive Success State Card
              <div className="space-y-6 text-center py-6 animate-fadeIn">
                <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto shadow-sm border border-emerald-100">
                  <CheckCircle2 className="w-9 h-9" strokeWidth={2.5} />
                </div>
                
                <div className="space-y-3">
                  <h3 className="text-[16px] sm:text-[28px] font-black text-gray-900 tracking-tight leading-tight">
                    Pengajuan Berhasil Dikirim!
                  </h3>
                  <p className="text-[16px] text-gray-500 leading-relaxed max-w-lg mx-auto font-normal">
                    Terima kasih atas ketertarikan Anda untuk berkolaborasi bersama kami, <strong className="text-gray-950 font-extrabold">{formData.name}</strong>. Data kemitraan Anda telah kami terima secara aman.
                  </p>
                </div>

                <div className="bg-[#FAF9F7] rounded-2xl p-5 shadow-md border border-black/[0.03] text-left max-w-md mx-auto space-y-2 text-[16px] sm:text-[16px] text-gray-650 font-semibold">
                  <div className="flex justify-between border-b border-gray-200/50 pb-2">
                    <span className="text-gray-400">Program</span>
                    <span className="text-gray-900 font-extrabold text-right">{formData.partnershipType}</span>
                  </div>
                  <div className="flex justify-between border-b border-gray-200/50 pb-2 pt-1">
                    <span className="text-gray-400">Email Kerja</span>
                    <span className="text-gray-900 font-extrabold text-right">{formData.email}</span>
                  </div>
                  <div className="flex justify-between pt-1">
                    <span className="text-gray-400">WhatsApp</span>
                    <span className="text-gray-900 font-extrabold text-right">{formData.whatsapp}</span>
                  </div>
                </div>

                <p className="text-[16px] sm:text-[16px] text-gray-500 max-w-md mx-auto leading-relaxed">
                  Partnership Manager kami akan segera menghubungi Anda melalui nomor WhatsApp di atas dalam waktu <strong className="text-[#990202] font-black">1-2 jam</strong> untuk mendiskusikan rencana kerja sama secara mendalam.
                </p>

                <div className="pt-4 flex flex-col sm:flex-row justify-center gap-3 max-w-md mx-auto">
                  <a
                    href={getWhatsAppLink(`Halo Partnership Manager EasyLegal, saya ${formData.name} baru saja mengajukan kemitraan ${formData.partnershipType} via formulir website.`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center px-6 py-3.5 bg-[#990202] hover:bg-[#800000] text-white font-extrabold text-[16px] rounded-xl shadow-md hover:shadow-lg transition-colors cursor-pointer text-center flex-1"
                  >
                    <span>Hubungi WA Sekarang</span>
                  </a>
                  <button
                    onClick={() => {
                      setIsSuccess(false);
                      setStep(1);
                      setFormData({
                        name: "",
                        role: "",
                        email: "",
                        whatsapp: "",
                        companyName: "",
                        businessActivity: "",
                        website: "",
                        officeAddress: "",
                        partnershipType: "Pilih Jenis Kerjasama",
                        proposal: "",
                        source: "Pilih"
                      });
                    }}
                    className="inline-flex items-center justify-center px-6 py-3.5 shadow-md border border-black/[0.04] text-gray-800 font-extrabold text-[16px] rounded-xl bg-white hover:bg-gray-50 transition-colors cursor-pointer text-center flex-1"
                  >
                    Kirim Ulang
                  </button>
                </div>
              </div>
            )}

          </div>

        </div>
      </section>

    </div>
  );
}
