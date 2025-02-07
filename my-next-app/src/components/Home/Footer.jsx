"use client"
import Link from 'next/link';
import { Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function Footer() {
  const thunderboltRef = useRef(null);
  const imageRef = useRef(null);
  // const textRef = useRef(null);

  useEffect(() => {
    // GSAP animation for the image (tilt and bounce effect)
    gsap.to(imageRef.current, {
      rotation: 15, // Tilting the image
      transformOrigin: 'center',
      duration: 1.5,
      yoyo: true,
      repeat: -1, // Repeats infinitely
      ease: 'power1.inOut',
    });

    // Glowing text effect for "Powered by Cipher Squad"
    // gsap.to(textRef.current, {
    //   textShadow: '0px 0px 20px #FFD700, 0px 0px 30px #FFD700',
    //   color: '#FFD700', // Golden glow
    //   ease: 'power2.inOut',
    //   repeat: -1,
    //   yoyo: true,
    //   duration: 1.5
    // });
  }, []);

  // Styles
const footerStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '#101010',
  padding: '20px 0',
  color: '#fff',
  fontSize: '18px',
  fontFamily: 'Arial, sans-serif',
};

const containerStyle = {
  display: 'flex',
  alignItems: 'center',
};

const textStyle = {
  marginLeft: '10px',
  fontSize: '20px', // Larger text for emphasis
  color: '#fff',
  fontWeight: 'bold',
  transition: 'color 0.5s ease', // Smooth transition for color change
};


const imageStyle = {
  width: '30px',
  height: '30px',
};
  return (
    <footer className=" text-black">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="space-y-8 xl:col-span-1">
            <Link href="/" className="text-2xl font-bold">
              Circle
            </Link>
            <p className="text-black text-base">
              Empowering Indian teams to achieve more through smart productivity solutions.
            </p>
            <div className="flex space-x-6">
              <Link href="#" className="text-black hover:text-slate-700">
                <span className="sr-only">Facebook</span>
                <Facebook className="h-6 w-6" />
              </Link>
              <Link href="#" className="text-black hover:text-slate-700">
                <span className="sr-only">Twitter</span>
                <Twitter className="h-6 w-6" />
              </Link>
              <Link href="#" className="text-black hover:text-slate-700">
                <span className="sr-only">LinkedIn</span>
                <Linkedin className="h-6 w-6" />
              </Link>
              <Link href="#" className="text-black hover:text-slate-700">
                <span className="sr-only">Instagram</span>
                <Instagram className="h-6 w-6" />
              </Link>
            </div>
          </div>
          <div className="mt-12 grid grid-cols-2 gap-8 xl:mt-0 xl:col-span-2">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold text-black tracking-wider uppercase">Solutions</h3>
                <ul className="mt-4 space-y-4">
                  <li><Link href="#" className="text-base  hover:text-black text-slate-700">Task Management</Link></li>
                  <li><Link href="#" className="text-base  hover:text-black text-slate-700">Time Tracking</Link></li>
                  <li><Link href="#" className="text-base  hover:text-black text-slate-700">Team Collaboration</Link></li>
                  <li><Link href="#" className="text-base  hover:text-black text-slate-700">Analytics</Link></li>
                </ul>
              </div>
              <div className="mt-12 md:mt-0">
                <h3 className="text-sm font-semibold text-black tracking-wider uppercase">Support</h3>
                <ul className="mt-4 space-y-4">
                  <li><Link href="#" className="text-base text-slate-700 hover:text-black">Pricing</Link></li>
                  <li><Link href="#" className="text-base text-slate-700 hover:text-black">Documentation</Link></li>
                  <li><Link href="#" className="text-base text-slate-700 hover:text-black">Guides</Link></li>
                  <li><Link href="#" className="text-base text-slate-700 hover:text-black">API Status</Link></li>
                </ul>
              </div>
            </div>
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold text-black tracking-wider uppercase">Company</h3>
                <ul className="mt-4 space-y-4">
                  <li><Link href="#" className="text-base text-slate-700 hover:text-black">About</Link></li>
                  <li><Link href="#" className="text-base text-slate-700 hover:text-black">Blog</Link></li>
                  <li><Link href="#" className="text-base text-slate-700 hover:text-black">Jobs</Link></li>
                  <li><Link href="#" className="text-base text-slate-700 hover:text-black">Press</Link></li>
                </ul>
              </div>
              <div className="mt-12 md:mt-0">
                <h3 className="text-sm font-semibold text-black tracking-wider uppercase">Legal</h3>
                <ul className="mt-4 space-y-4">
                  <li><Link href="#" className="text-base text-slate-700 hover:text-black">Privacy</Link></li>
                  <li><Link href="#" className="text-base text-slate-700 hover:text-black">Terms</Link></li>
                  <li><Link href="#" className="text-base text-slate-700 hover:text-black">Cookie Policy</Link></li>
                  <li><Link href="#" className="text-base text-slate-700 hover:text-black">Trademark Policy</Link></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-12 border-t border-gray-700 pt-8 ">
          <p className="text-base text-black xl:text-center">
            &copy; 2024 Circle, Inc. All rights reserved.
          </p>
    
        </div>
        <div className='mt-5 flex items-center justify-center p-5' style={containerStyle}>
        <img
          ref={imageRef}
          src="https://cdn-icons-png.freepik.com/512/8446/8446536.png?ga=GA1.1.776027911.1729182668" // Make sure this is the correct path to your PNG
          alt="Thunderbolt Icon"
          style={imageStyle}
        />
        <span className='font-semibold' >Powered by Cipher Squad</span>
      </div>
      </div>
        
    </footer>
  );
}