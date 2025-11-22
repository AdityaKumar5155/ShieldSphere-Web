import { Routes, Route } from 'react-router-dom'
import Index from "@/pages/Index"
import Tools from "@/pages/Tools"
import Phishing from "@/pages/Phishing"
import DnsWhois from "@/pages/DnsWhois"
import Subdomains from "@/pages/Subdomains"
import Password from "@/pages/Password"

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/tools" element={<Tools />} />
      <Route path="/tools/phishing" element={<Phishing />} />
      <Route path="/tools/dns-whois" element={<DnsWhois />} />
      <Route path="/tools/subdomains" element={<Subdomains />} />
      <Route path="/tools/password" element={<Password />} />
    </Routes>
  )
}

export default App
