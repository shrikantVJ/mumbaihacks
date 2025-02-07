'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    question: "How does SakriyaBoss use AI to improve productivity for Indian teams?",
    answer: "SakriyaBoss leverages AI to analyze work patterns specific to Indian work culture, automate task assignments, provide intelligent insights, and optimize workflows. This helps teams focus on high-value work and reduces time spent on repetitive tasks, considering the unique challenges faced by Indian businesses."
  },
  {
    question: "Can SakriyaBoss integrate with other tools commonly used in India?",
    answer: "Yes, SakriyaBoss offers integrations with popular tools used in India like Zoho, Tally, and local communication platforms, in addition to global tools like Slack and Microsoft Teams. We're constantly adding new integrations to ensure seamless workflow across your tech stack."
  },
  {
    question: "Is my data secure and compliant with Indian regulations?",
    answer: "Absolutely. We prioritize data security and comply with Indian data protection laws, including the proposed Personal Data Protection Bill. All data is encrypted in transit and at rest, and we offer features like two-factor authentication and single sign-on. We also provide options for data localization to meet regulatory requirements."
  },
  {
    question: "How does SakriyaBoss support multilingual teams in India?",
    answer: "SakriyaBoss supports multiple Indian languages in its interface and AI-powered features. This allows team members to collaborate effectively regardless of their preferred language fostering inclusive and efficient communication across diverse Indian teams."
  },
  {
    question: "Do you offer customer support in Indian time zones?",
    answer: "Yes we provide 24/7 customer support with dedicated teams operating in Indian time zones. Our support staff is well-versed in the specific needs and challenges of Indian businesses, ensuring you receive timely and relevant assistance."
  }
];

export default function FAQ() {
  return (
    <section className="py-24" id="faq">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-base text-blue-600 font-semibold tracking-wide uppercase"
          >
            FAQ
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl"
          >
            Frequently asked questions
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto"
          >
            Cant find the answer youre looking for? Reach out to our customer support team.
          </motion.p>
        </div>
        <div className="mt-20">
          {faqs.map((faq, index) => (
            <FAQItem key={index} question={faq.question} answer={faq.answer} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQItem({ question, answer }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="border-b border-gray-200"
    >
      <button
        className="py-6 w-full flex justify-between items-center text-left focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-lg font-medium text-gray-900">{question}</span>
        <ChevronDown
          className={`w-5 h-5 text-gray-500 transform transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className="pb-6 text-base text-gray-500">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}