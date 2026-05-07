"use client"

import { Facebook, Plus, Trash2 } from "lucide-react"
import { useState } from "react"
import { Input } from "./ui/input"
import { validators, sanitize } from "@/lib/validators"

interface SettingsViewProps {
  settings: any
  setSettings: (settings: any) => void
  onSave: () => void
  saved: boolean
}

export const SettingsView = ({ settings, setSettings, onSave, saved }: SettingsViewProps) => {
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [touched, setTouched] = useState<Record<string, boolean>>({})
  const [additionalGoogleLinks, setAdditionalGoogleLinks] = useState<string[]>(settings.googleLinks2 || [])
  const [additionalFacebookLinks, setAdditionalFacebookLinks] = useState<string[]>(settings.facebookLinks2 || [])
  const [additionalYelpLinks, setAdditionalYelpLinks] = useState<string[]>(settings.yelpLinks2 || [])

  const validateField = (field: string, value: string) => {
    let result = { valid: true, error: "" }

    switch (field) {
      case "businessName":
        result = validators.businessName(value)
        break
      case "googleLink":
      case "facebookLink":
      case "yelpLink":
      case "negativeReviewLink":
        result = validators.url(value)
        break
    }

    setErrors((prev) => ({
      ...prev,
      [field]: result.error || "",
    }))

    return result.valid
  }

  const handleFieldChange = (field: string, value: string) => {
    const sanitizedValue = sanitize.text(value)
    setSettings({ ...settings, [field]: sanitizedValue })

    if (touched[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  const handleFieldBlur = (field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }))
    validateField(field, settings[field])
  }

  const addLink = (platform: string) => {
    switch (platform) {
      case "google":
        setAdditionalGoogleLinks([...additionalGoogleLinks, ""])
        break
      case "facebook":
        setAdditionalFacebookLinks([...additionalFacebookLinks, ""])
        break
      case "yelp":
        setAdditionalYelpLinks([...additionalYelpLinks, ""])
        break
    }
  }

  const removeLink = (platform: string, index: number) => {
    switch (platform) {
      case "google":
        setAdditionalGoogleLinks(additionalGoogleLinks.filter((_, i) => i !== index))
        break
      case "facebook":
        setAdditionalFacebookLinks(additionalFacebookLinks.filter((_, i) => i !== index))
        break
      case "yelp":
        setAdditionalYelpLinks(additionalYelpLinks.filter((_, i) => i !== index))
        break
    }
  }

  const updateLink = (platform: string, index: number, value: string) => {
    const sanitized = sanitize.text(value)
    switch (platform) {
      case "google":
        const newGoogleLinks = [...additionalGoogleLinks]
        newGoogleLinks[index] = sanitized
        setAdditionalGoogleLinks(newGoogleLinks)
        break
      case "facebook":
        const newFacebookLinks = [...additionalFacebookLinks]
        newFacebookLinks[index] = sanitized
        setAdditionalFacebookLinks(newFacebookLinks)
        break
      case "yelp":
        const newYelpLinks = [...additionalYelpLinks]
        newYelpLinks[index] = sanitized
        setAdditionalYelpLinks(newYelpLinks)
        break
    }
  }

  const handleSave = () => {
    const fieldsToValidate = ["businessName", "googleLink", "facebookLink", "yelpLink"]
    let isValid = true

    fieldsToValidate.forEach((field) => {
      const valid = validateField(field, settings[field])
      if (!valid) isValid = false
      setTouched((prev) => ({ ...prev, [field]: true }))
    })

    if (isValid) {
      setSettings({
        ...settings,
        googleLinks2: additionalGoogleLinks.filter((l) => l.trim()),
        facebookLinks2: additionalFacebookLinks.filter((l) => l.trim()),
        yelpLinks2: additionalYelpLinks.filter((l) => l.trim()),
      })
      onSave()
    }
  }

  return (
    <div className="max-w-2xl animate-in fade-in duration-500">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">Business Profile</h1>
        <p className="text-slate-500">Manage your brand and review destinations.</p>
      </div>

      <div className="bg-white p-8 rounded-xl border border-slate-200 shadow-sm space-y-6">
        <Input
          label="Business Name"
          type="text"
          value={settings.businessName}
          onChange={(e) => handleFieldChange("businessName", e.target.value)}
          onBlur={() => handleFieldBlur("businessName")}
          error={touched.businessName ? errors.businessName : ""}
          placeholder="e.g. Mario's Pizza"
          required
        />

        <div className="space-y-4 pt-4 border-t border-slate-100">
          <div>
            <h3 className="font-bold text-slate-800 mb-2">Positive Review Destinations</h3>
            <p className="text-sm text-slate-500 mb-4">
              Add review platform links. Customers with 4-5 star ratings will be shown buttons to leave reviews on all these platforms.
            </p>

            <div className="space-y-4">
              <div>
                <div className="relative">
                  <img
                    src="https://www.google.com/favicon.ico"
                    className="w-4 h-4 absolute top-[3.25rem] left-3 opacity-50 z-10"
                    alt="Google"
                  />
                  <Input
                    label="Primary Google Maps Link"
                    type="url"
                    value={settings.googleLink}
                    onChange={(e) => handleFieldChange("googleLink", e.target.value)}
                    onBlur={() => handleFieldBlur("googleLink")}
                    error={touched.googleLink ? errors.googleLink : ""}
                    placeholder="https://g.page/your-business"
                    className="pl-10"
                    helperText="Get your link from Google Business Profile"
                  />
                </div>
              </div>

              {additionalGoogleLinks.map((link, idx) => (
                <div key={`google-${idx}`} className="relative flex gap-2">
                  <img
                    src="https://www.google.com/favicon.ico"
                    className="w-4 h-4 absolute top-[3.25rem] left-3 opacity-50 z-10"
                    alt="Google"
                  />
                  <input
                    type="url"
                    value={link}
                    onChange={(e) => updateLink("google", idx, e.target.value)}
                    placeholder="https://g.page/another-location"
                    className="flex-1 px-4 py-3 pl-10 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-slate-900 transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => removeLink("google", idx)}
                    className="px-3 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              ))}

              <button
                type="button"
                onClick={() => addLink("google")}
                className="text-sm text-slate-600 hover:text-slate-900 font-medium flex items-center gap-1 py-2"
              >
                <Plus size={16} />
                Add Another Google Location
              </button>
            </div>
          </div>

          <div>
            <div className="relative">
              <Facebook size={16} className="absolute top-[3.25rem] left-3 text-blue-600 z-10" />
              <Input
                label="Primary Facebook Page Link"
                type="url"
                value={settings.facebookLink}
                onChange={(e) => handleFieldChange("facebookLink", e.target.value)}
                onBlur={() => handleFieldBlur("facebookLink")}
                error={touched.facebookLink ? errors.facebookLink : ""}
                placeholder="https://facebook.com/your-page"
                className="pl-10"
              />
            </div>

            {additionalFacebookLinks.map((link, idx) => (
              <div key={`facebook-${idx}`} className="relative flex gap-2 mt-3">
                <Facebook size={16} className="absolute top-[0.6rem] left-3 text-blue-600 z-10" />
                <input
                  type="url"
                  value={link}
                  onChange={(e) => updateLink("facebook", idx, e.target.value)}
                  placeholder="https://facebook.com/another-page"
                  className="flex-1 px-4 py-3 pl-10 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-slate-900 transition-colors"
                />
                <button
                  type="button"
                  onClick={() => removeLink("facebook", idx)}
                  className="px-3 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))}

            {additionalFacebookLinks.length === 0 && (
              <button
                type="button"
                onClick={() => addLink("facebook")}
                className="text-sm text-slate-600 hover:text-slate-900 font-medium flex items-center gap-1 py-2 mt-2"
              >
                <Plus size={16} />
                Add Another Facebook Page
              </button>
            )}
          </div>

          <div>
            <div className="relative">
              <span className="font-bold text-red-600 text-xs absolute top-[3.25rem] left-3 z-10">Y!</span>
              <Input
                label="Primary Yelp Link"
                type="url"
                value={settings.yelpLink}
                onChange={(e) => handleFieldChange("yelpLink", e.target.value)}
                onBlur={() => handleFieldBlur("yelpLink")}
                error={touched.yelpLink ? errors.yelpLink : ""}
                placeholder="https://yelp.com/biz/your-business"
                className="pl-10"
              />
            </div>

            {additionalYelpLinks.map((link, idx) => (
              <div key={`yelp-${idx}`} className="relative flex gap-2 mt-3">
                <span className="font-bold text-red-600 text-xs absolute top-[0.6rem] left-3 z-10">Y!</span>
                <input
                  type="url"
                  value={link}
                  onChange={(e) => updateLink("yelp", idx, e.target.value)}
                  placeholder="https://yelp.com/biz/another-location"
                  className="flex-1 px-4 py-3 pl-10 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-slate-900 transition-colors"
                />
                <button
                  type="button"
                  onClick={() => removeLink("yelp", idx)}
                  className="px-3 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))}

            {additionalYelpLinks.length === 0 && (
              <button
                type="button"
                onClick={() => addLink("yelp")}
                className="text-sm text-slate-600 hover:text-slate-900 font-medium flex items-center gap-1 py-2 mt-2"
              >
                <Plus size={16} />
                Add Another Yelp Location
              </button>
            )}
          </div>
        </div>

        <div className="pt-6 border-t border-slate-100 flex justify-end items-center space-x-4">
          {saved && <span className="text-emerald-600 text-sm font-medium animate-in fade-in">Saved Successfully</span>}
          <button
            onClick={handleSave}
            className="bg-slate-900 hover:bg-black text-white font-bold py-3 px-8 rounded-lg shadow-lg shadow-slate-900/20 transition-all"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  )
}
