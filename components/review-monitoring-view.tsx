"use client"

import { useState, useEffect } from "react"
import { Star, ExternalLink, TrendingUp, RefreshCw, AlertCircle, Globe } from "lucide-react"
import { LoadingSpinner } from "./loading-spinner"

interface ReviewMonitoringViewProps {
  isPremium: boolean
  googleLink?: string
  facebookLink?: string
  yelpLink?: string
}

interface Review {
  id: string
  platform: "google" | "facebook" | "yelp"
  author: string
  rating: number
  text: string
  date: string
  url: string
}

export function ReviewMonitoringView({ isPremium, googleLink, facebookLink, yelpLink }: ReviewMonitoringViewProps) {
  const [reviews, setReviews] = useState<Review[]>([])
  const [loading, setLoading] = useState(false)
  const [filterPlatform, setFilterPlatform] = useState<string>("all")
  const [filterRating, setFilterRating] = useState<string>("all")

  // Demo reviews for showcase
  const demoReviews: Review[] = [
    {
      id: "1",
      platform: "google",
      author: "Jennifer Martinez",
      rating: 5,
      text: "Outstanding service from start to finish! The team was professional, responsive, and went above and beyond to ensure everything was perfect. Highly recommend!",
      date: "2 days ago",
      url: googleLink || "#",
    },
    {
      id: "2",
      platform: "facebook",
      author: "David Chen",
      rating: 5,
      text: "Best experience I've had with any company in this industry. The attention to detail and customer care is unmatched. Will definitely be coming back!",
      date: "5 days ago",
      url: facebookLink || "#",
    },
    {
      id: "3",
      platform: "google",
      author: "Sarah Thompson",
      rating: 4,
      text: "Great service overall. Very satisfied with the results. The only minor issue was the wait time, but the quality made up for it.",
      date: "1 week ago",
      url: googleLink || "#",
    },
    {
      id: "4",
      platform: "yelp",
      author: "Michael R.",
      rating: 5,
      text: "Exceeded all my expectations! The entire process was smooth and the final result was exactly what I wanted. Can't say enough good things!",
      date: "1 week ago",
      url: yelpLink || "#",
    },
    {
      id: "5",
      platform: "google",
      author: "Emily Johnson",
      rating: 3,
      text: "Decent experience, but there's room for improvement. The service was okay but didn't wow me. Price was fair for what I received.",
      date: "2 weeks ago",
      url: googleLink || "#",
    },
    {
      id: "6",
      platform: "facebook",
      author: "Robert Williams",
      rating: 5,
      text: "Phenomenal! This is exactly what I was looking for. The team was incredibly helpful and knowledgeable. Five stars all the way!",
      date: "2 weeks ago",
      url: facebookLink || "#",
    },
  ]

  useEffect(() => {
    // Load demo reviews
    setReviews(demoReviews)
  }, [googleLink, facebookLink, yelpLink])

  const refreshReviews = async () => {
    setLoading(true)
    // Simulate API call
    setTimeout(() => {
      setReviews(demoReviews)
      setLoading(false)
    }, 1500)
  }

  const filteredReviews = reviews.filter((review) => {
    if (filterPlatform !== "all" && review.platform !== filterPlatform) return false
    if (filterRating !== "all") {
      const ratingNum = Number.parseInt(filterRating)
      if (ratingNum === 5 && review.rating !== 5) return false
      if (ratingNum === 4 && review.rating !== 4) return false
      if (ratingNum === 3 && review.rating < 4) return false
    }
    return true
  })

  const avgRating =
    reviews.length > 0 ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1) : "0.0"

  const platformCounts = {
    google: reviews.filter((r) => r.platform === "google").length,
    facebook: reviews.filter((r) => r.platform === "facebook").length,
    yelp: reviews.filter((r) => r.platform === "yelp").length,
  }

  const ratingDistribution = [5, 4, 3, 2, 1].map((rating) => ({
    rating,
    count: reviews.filter((r) => r.rating === rating).length,
    percentage: reviews.length > 0 ? (reviews.filter((r) => r.rating === rating).length / reviews.length) * 100 : 0,
  }))

  return (
    <div className="max-w-6xl animate-in fade-in duration-500 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Review Monitoring</h1>
          <p className="text-slate-500">All your reviews from every platform in one place</p>
        </div>
        <button
          onClick={refreshReviews}
          disabled={loading}
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white px-4 py-2.5 rounded-lg font-medium transition-colors"
        >
          {loading ? <LoadingSpinner size="sm" /> : <RefreshCw size={16} />}
          <span>Refresh</span>
        </button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Total Reviews</span>
            <Globe size={16} className="text-slate-400" />
          </div>
          <div className="text-3xl font-bold text-slate-900">{reviews.length}</div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Avg Rating</span>
            <Star size={16} className="text-amber-400" fill="currentColor" />
          </div>
          <div className="text-3xl font-bold text-slate-900">{avgRating}</div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">5-Star Reviews</span>
            <TrendingUp size={16} className="text-emerald-500" />
          </div>
          <div className="text-3xl font-bold text-slate-900">{reviews.filter((r) => r.rating === 5).length}</div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Needs Attention</span>
            <AlertCircle size={16} className="text-rose-500" />
          </div>
          <div className="text-3xl font-bold text-slate-900">{reviews.filter((r) => r.rating < 4).length}</div>
        </div>
      </div>

      {/* Rating Distribution */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
        <h3 className="font-bold text-slate-800 mb-4">Rating Distribution</h3>
        <div className="space-y-3">
          {ratingDistribution.map(({ rating, count, percentage }) => (
            <div key={rating} className="flex items-center gap-4">
              <div className="flex items-center gap-1 w-20">
                <span className="font-medium text-sm text-slate-700">{rating}</span>
                <Star size={14} className="text-amber-400" fill="currentColor" />
              </div>
              <div className="flex-1 bg-slate-100 rounded-full h-3 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-amber-400 to-amber-500 h-full transition-all duration-500"
                  style={{ width: `${percentage}%` }}
                ></div>
              </div>
              <span className="text-sm font-medium text-slate-600 w-16 text-right">
                {count} ({percentage.toFixed(0)}%)
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4">
        <div className="flex flex-wrap gap-3">
          <div className="flex items-center gap-2">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Platform:</label>
            <select
              value={filterPlatform}
              onChange={(e) => setFilterPlatform(e.target.value)}
              className="px-3 py-1.5 text-sm border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
            >
              <option value="all">All Platforms</option>
              <option value="google">Google ({platformCounts.google})</option>
              <option value="facebook">Facebook ({platformCounts.facebook})</option>
              <option value="yelp">Yelp ({platformCounts.yelp})</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Rating:</label>
            <select
              value={filterRating}
              onChange={(e) => setFilterRating(e.target.value)}
              className="px-3 py-1.5 text-sm border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
            >
              <option value="all">All Ratings</option>
              <option value="5">5 Stars</option>
              <option value="4">4 Stars</option>
              <option value="3">3 Stars & Below</option>
            </select>
          </div>
        </div>
      </div>

      {/* Reviews List */}
      <div className="space-y-4">
        {filteredReviews.length === 0 ? (
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-12 text-center">
            <AlertCircle size={48} className="mx-auto mb-4 text-slate-300" />
            <p className="text-slate-500">No reviews match your filters</p>
          </div>
        ) : (
          filteredReviews.map((review) => (
            <div
              key={review.id}
              className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between gap-4 mb-4">
                <div className="flex items-center gap-3">
                  <div
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 ${
                      review.platform === "google"
                        ? "bg-blue-50 text-blue-700"
                        : review.platform === "facebook"
                          ? "bg-indigo-50 text-indigo-700"
                          : "bg-red-50 text-red-700"
                    }`}
                  >
                    <img
                      src={
                        review.platform === "google"
                          ? "https://www.google.com/favicon.ico"
                          : review.platform === "facebook"
                            ? "https://www.facebook.com/favicon.ico"
                            : "https://www.yelp.com/favicon.ico"
                      }
                      alt={review.platform}
                      className="w-3 h-3"
                    />
                    {review.platform.charAt(0).toUpperCase() + review.platform.slice(1)}
                  </div>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={14}
                        className={i < review.rating ? "text-amber-400 fill-amber-400" : "text-slate-200"}
                      />
                    ))}
                  </div>
                </div>
                <a
                  href={review.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-400 hover:text-indigo-600 transition-colors"
                >
                  <ExternalLink size={16} />
                </a>
              </div>

              <p className="text-slate-700 text-sm mb-3 leading-relaxed">{review.text}</p>

              <div className="flex items-center justify-between text-xs text-slate-400">
                <span className="font-medium">— {review.author}</span>
                <span>{review.date}</span>
              </div>
            </div>
          ))
        )}
      </div>

      {!isPremium && (
        <div className="bg-gradient-to-br from-indigo-50 to-violet-50 border border-indigo-100 rounded-xl p-6 text-center">
          <h3 className="font-bold text-indigo-900 mb-2">Unlock Real-Time Review Monitoring</h3>
          <p className="text-indigo-700 text-sm mb-4">
            Upgrade to Pro to automatically sync reviews from Google, Facebook, Yelp, and more platforms
          </p>
          <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2.5 rounded-lg font-bold transition-colors">
            Upgrade to Pro
          </button>
        </div>
      )}
    </div>
  )
}
