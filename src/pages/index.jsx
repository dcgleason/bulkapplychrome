import Head from 'next/head'

import { CallToAction } from '@/components/CallToAction'
import { Faqs } from '@/components/Faqs'
import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { Hero } from '@/components/Hero'
import { Pricing } from '@/components/Pricing'
import { PrimaryFeatures } from '@/components/PrimaryFeatures'
import { SecondaryFeatures } from '@/components/SecondaryFeatures'
import { Testimonials } from '@/components/Testimonials'

export default function Home() {
  return (
    <>
        <Head>
          <title>Webshop Wizards: Premium Web Development and Design Services</title>
          <meta
            name="description"
            content="Webshop Wizards is a flexible, subscription-based web development and design agency. We prioritize user-friendly solutions without compromising accuracy, and provide ongoing service billed monthly. Experience the magic of our Shopify services today."
          />
          <meta name="keywords" content="Web Development, Design, Subscription-based, Webshop Wizards, E-commerce, Startups, User Research, UX/UI, Online Store, SEO, User-friendly, Ongoing Service"/>
      </Head>
      <Header />

      <main>
        <Hero />
        <PrimaryFeatures />
        <SecondaryFeatures />
        <CallToAction />
        <Testimonials />
        <Pricing />
        <Faqs />
      </main>
      <Footer />
    </>
  )
}
