import React from "react";
import styled from "styled-components";
import {
  BuildingOfficeIcon,
  ClipboardDocumentCheckIcon,
  GlobeAltIcon,
  CubeIcon,
  ChartBarIcon,
  Cog6ToothIcon,
} from "@heroicons/react/24/outline";
import { motion } from "framer-motion";

const services = [
  { icon: <BuildingOfficeIcon className="w-8 h-8 text-[#143939]" />, title: "Architectural Design", color: "142, 249, 252" },
  { icon: <ClipboardDocumentCheckIcon className="w-8 h-8 text-[#143939]" />, title: "Project Supervision", color: "142, 252, 204" },
  { icon: <GlobeAltIcon className="w-8 h-8 text-[#143939]" />, title: "Sustainable Development", color: "142, 252, 157" },
  { icon: <CubeIcon className="w-8 h-8 text-[#143939]" />, title: "3D Modeling", color: "215, 252, 142" },
  { icon: <ChartBarIcon className="w-8 h-8 text-[#143939]" />, title: "Consulting", color: "252, 208, 142" },
  { icon: <Cog6ToothIcon className="w-8 h-8 text-[#143939]" />, title: "Technical Solutions", color: "252, 142, 142" },
];

const ServicesCards = () => {
  return (
    <StyledSection>
      <motion.h2
        initial={{ opacity: 0, y: 40, scale: 0.8 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.6 }}
        className="relative w-fit mx-auto text-center text-3xl md:text-5xl font-extrabold 
               bg-gradient-to-r from-green-700 via-gray-600 to-green-500 
               bg-clip-text text-transparent tracking-wide"
      >
        Our Services
      </motion.h2>

      <div className="layout">
        <div className="wrapper">
          <div className="inner" style={{ "--quantity": services.length }}>
            {services.map((s, i) => (
              <div
                key={i}
                className="card"
                style={{ "--index": i, "--color-card": s.color }}
              >
                <div className="img">
                  <div className="content">
                    {s.icon}
                    <h3 className="card-h3">{s.title}</h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="info-card">
          <h3 className="info-title">Why Choose Our Services</h3>
          <p className="info-paragraph">
            We provide architectural solutions with precision, creativity, and
            sustainability.
          </p>
          <ul className="info-list">
            <li>✔ Expert Architectural Design</li>
            <li>✔ Sustainable & Modern Solutions</li>
            <li>✔ Professional Supervision</li>
            <li>✔ Innovative 3D Visualization</li>
          </ul>
        </div>
      </div>
    </StyledSection>
  );
};

const StyledSection = styled.section`
  background: linear-gradient(135deg, #f0f0f0, #d4d4d4, #bfbfbf);
  padding: 4rem 1rem;
  position: relative;
  overflow: hidden;

  .layout {
    display: flex;
    flex-direction: row; /* افتراضي للديسكتوب */
    justify-content: center;
    align-items: center;
    gap: 2rem;
    max-width: 1200px;
    margin: 60px 40px  auto 90px;
    
    @media (max-width: 968px) {
      flex-direction: column; /* تحويل لعمودي في الموبايل */
      gap: 3rem;
      // margin-top:150px;
      margin:150px 0 auto auto;
    }
  }

  .wrapper {
    flex: 0.6;
    height: 400px;
    width: 100%;
    position: relative;
    display: flex;
    justify-content: center;
    perspective: 1200px;
  }

  .inner {
    --w: 120px;
    --h: 180px;
    --translateZ: 220px;
    --rotateX: -10deg;
    position: absolute;
    width: var(--w);
    height: var(--h);
    transform-style: preserve-3d;
    animation: rotating 25s linear infinite;
    /* التوسيط */
    left: 50%;
    top: 40%;
    margin-left: calc(var(--w) / -2);
    margin-top: calc(var(--h) / -2);

    @media (max-width: 640px) {
      --w: 90px;
      --h: 140px;
      --translateZ: 150px;
    }
  }

  @keyframes rotating {
    from { transform: rotateX(var(--rotateX)) rotateY(0); }
    to { transform: rotateX(var(--rotateX)) rotateY(1turn); }
  }

  .card {
    position: absolute;
    border: 2px solid rgba(var(--color-card));
    border-radius: 12px;
    inset: 0;
    transform: rotateY(calc((360deg / var(--quantity)) * var(--index))) translateZ(var(--translateZ));
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(5px);
  }

  .img {
    width: 100%; height: 100%;
    display: flex; align-items: center; justify-content: center;
    background: radial-gradient(circle, rgba(var(--color-card), 0.2) 0%, rgba(var(--color-card), 0.8) 100%);
  }

  .card-h3 {
    margin-top: 8px;
    font-size: 0.8rem;
    line-height: 1.1;
  }

  /* ✅ تعديلات الكارد اليميني لضبط الموبايل */
  .info-card {
    flex: 0.4;
    background: rgba(20, 57, 57, 0.9);
    border-radius: 1.5rem;
    padding: 2rem;
    box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.3);
    color: #fff;
    width: 100%;
    max-width: 450px; /* منع التمدد العرضي الزائد */
    z-index: 10;
  
    @media (max-width: 968px) {
       max-width: 90%; /* في الموبايل ياخد عرض الشاشة تقريباً */
       padding: 1.5rem;
       margin-top:120px;
    }
  

  .info-title {
    font-size: 1.6rem; /* تصغير من 2rem */
    font-weight: 800;
    margin-bottom: 0.8rem;
    color: #8efccc; /* لون مميز للعنوان */
  }

  .info-paragraph {
    font-size: 1.1rem; /* تصغير من 1.8rem لأنه كان ضخم جداً */
    margin-bottom: 1.5rem;
    line-height: 1.5;
    opacity: 0.9;
  }

  .info-list {
    list-style: none;
    padding: 0;
  }

  .info-list li {
    margin-bottom: 0.8rem;
    font-size: 0.95rem;
    display: flex;
    align-items: center;
    gap: 10px;
    border-bottom: 1px solid rgba(255,255,255,0.1);
    padding-bottom: 5px;
  }

  .inner:hover { animation-play-state: paused; }
`;

export default ServicesCards;