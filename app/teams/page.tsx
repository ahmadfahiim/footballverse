"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MapPin, Users, Mail, Phone, Search } from "lucide-react"
import { useState } from "react"
import Link from "next/link"

// Mock data for demonstration
const mockTeams = [
  {
    id: 1,
    name: "City Strikers",
    city: "New York",
    experience: "Intermediate",
    description: "Competitive team looking for regular matches. We play every weekend and focus on tactical gameplay.",
    contactName: "John Smith",
    email: "john@citystrikers.com",
    phone: "+1 (555) 123-4567",
    preferredDays: "Weekends",
    logo: "/placeholder.svg?height=60&width=60",
  },
  {
    id: 2,
    name: "Thunder FC",
    city: "Los Angeles",
    experience: "Advanced",
    description: "Semi-professional team with 5+ years experience. Looking for challenging opponents.",
    contactName: "Mike Johnson",
    email: "mike@thunderfc.com",
    phone: "+1 (555) 987-6543",
    preferredDays: "Flexible",
    logo: "/placeholder.svg?height=60&width=60",
  },
  {
    id: 3,
    name: "Green Eagles",
    city: "Chicago",
    experience: "Beginner",
    description: "Newly formed team of friends who love football. Looking for friendly matches to improve our skills.",
    contactName: "Sarah Wilson",
    email: "sarah@greeneagles.com",
    phone: "+1 (555) 456-7890",
    preferredDays: "Weekends",
    logo: "/placeholder.svg?height=60&width=60",
  },
  {
    id: 4,
    name: "Red Lions",
    city: "Miami",
    experience: "Intermediate",
    description: "Passionate team with great team spirit. We believe in fair play and having fun while competing.",
    contactName: "Carlos Rodriguez",
    email: "carlos@redlions.com",
    phone: "+1 (555) 321-0987",
    preferredDays: "Weekday Evenings",
    logo: "/placeholder.svg?height=60&width=60",
  },
]

export default function TeamsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filteredTeams, setFilteredTeams] = useState(mockTeams)

  const handleSearch = (term: string) => {
    setSearchTerm(term)
    const filtered = mockTeams.filter(
      (team) =>
        team.name.toLowerCase().includes(term.toLowerCase()) ||
        team.city.toLowerCase().includes(term.toLowerCase()) ||
        team.experience.toLowerCase().includes(term.toLowerCase()),
    )
    setFilteredTeams(filtered)
  }

  const getExperienceBadgeColor = (experience: string) => {
    switch (experience.toLowerCase()) {
      case "beginner":
        return "bg-green-100 text-green-800"
      case "intermediate":
        return "bg-blue-100 text-blue-800"
      case "advanced":
        return "bg-purple-100 text-purple-800"
      case "semi-pro":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-4">Registered Teams</h1>
        <p className="text-gray-600 mb-6">Browse teams in your area and connect with fellow football enthusiasts</p>

        <div className="max-w-md mx-auto relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search teams by name, city, or experience..."
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTeams.map((team) => (
          <Card key={team.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center space-x-4">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={team.logo || "/placeholder.svg"} alt={team.name} />
                  <AvatarFallback>
                    {team.name
                      .split(" ")
                      .map((word) => word[0])
                      .join("")
                      .toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <CardTitle className="text-lg">{team.name}</CardTitle>
                  <div className="flex items-center text-sm text-gray-600 mt-1">
                    <MapPin className="h-4 w-4 mr-1" />
                    {team.city}
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Badge className={getExperienceBadgeColor(team.experience)}>{team.experience}</Badge>
                <Badge variant="outline">{team.preferredDays}</Badge>
              </div>

              <p className="text-sm text-gray-600 line-clamp-3">{team.description}</p>

              <div className="space-y-2 text-sm">
                <div className="flex items-center text-gray-600">
                  <Users className="h-4 w-4 mr-2" />
                  Contact: {team.contactName}
                </div>
                <div className="flex items-center text-gray-600">
                  <Mail className="h-4 w-4 mr-2" />
                  {team.email}
                </div>
                {team.phone && (
                  <div className="flex items-center text-gray-600">
                    <Phone className="h-4 w-4 mr-2" />
                    {team.phone}
                  </div>
                )}
              </div>

              <div className="flex space-x-2 pt-4">
                <Link href={`/matchmaking?team=${team.id}`} className="flex-1">
                  <Button className="w-full" size="sm">
                    Request Match
                  </Button>
                </Link>
                <Button variant="outline" size="sm">
                  View Profile
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredTeams.length === 0 && (
        <div className="text-center py-12">
          <Users className="h-12 w-12 mx-auto text-gray-400 mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No teams found</h3>
          <p className="text-gray-600 mb-4">Try adjusting your search terms or browse all teams</p>
          <Button onClick={() => handleSearch("")}>Show All Teams</Button>
        </div>
      )}
    </div>
  )
}
