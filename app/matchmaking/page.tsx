"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { CalendarIcon, MapPin, Users, Clock } from "lucide-react"
import { useState } from "react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"

export default function MatchmakingPage() {
  const [selectedDate, setSelectedDate] = useState<Date>()
  const [matchRequest, setMatchRequest] = useState({
    opponentTeam: "",
    proposedDate: "",
    proposedTime: "",
    venue: "",
    message: "",
    matchType: "",
  })

  // Mock opponent team data
  const opponentTeam = {
    id: 1,
    name: "City Strikers",
    city: "New York",
    experience: "Intermediate",
    contactName: "John Smith",
    logo: "/placeholder.svg?height=60&width=60",
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Match request:", matchRequest)
    alert("Match request sent successfully!")
  }

  const handleInputChange = (field: string, value: string) => {
    setMatchRequest((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-4">Request a Match</h1>
        <p className="text-gray-600">Send a match request to another team and organize a friendly game</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Opponent Team Info */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Opponent Team</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-4 mb-4">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={opponentTeam.logo || "/placeholder.svg"} alt={opponentTeam.name} />
                  <AvatarFallback>CS</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold">{opponentTeam.name}</h3>
                  <div className="flex items-center text-sm text-gray-600">
                    <MapPin className="h-4 w-4 mr-1" />
                    {opponentTeam.city}
                  </div>
                </div>
              </div>
              <Badge className="bg-blue-100 text-blue-800">{opponentTeam.experience}</Badge>
              <div className="mt-4 text-sm text-gray-600">
                <div className="flex items-center mb-2">
                  <Users className="h-4 w-4 mr-2" />
                  Contact: {opponentTeam.contactName}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Match Request Form */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Match Details</CardTitle>
              <CardDescription>Fill in the match details and send your request</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Proposed Date *</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !selectedDate && "text-muted-foreground",
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {selectedDate ? format(selectedDate, "PPP") : "Pick a date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar mode="single" selected={selectedDate} onSelect={setSelectedDate} initialFocus />
                      </PopoverContent>
                    </Popover>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="time">Proposed Time *</Label>
                    <Select onValueChange={(value) => handleInputChange("proposedTime", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select time" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="09:00">9:00 AM</SelectItem>
                        <SelectItem value="10:00">10:00 AM</SelectItem>
                        <SelectItem value="11:00">11:00 AM</SelectItem>
                        <SelectItem value="14:00">2:00 PM</SelectItem>
                        <SelectItem value="15:00">3:00 PM</SelectItem>
                        <SelectItem value="16:00">4:00 PM</SelectItem>
                        <SelectItem value="17:00">5:00 PM</SelectItem>
                        <SelectItem value="18:00">6:00 PM</SelectItem>
                        <SelectItem value="19:00">7:00 PM</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="matchType">Match Type</Label>
                  <Select onValueChange={(value) => handleInputChange("matchType", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select match type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="friendly">Friendly Match</SelectItem>
                      <SelectItem value="practice">Practice Game</SelectItem>
                      <SelectItem value="tournament">Tournament Prep</SelectItem>
                      <SelectItem value="scrimmage">Scrimmage</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="venue">Proposed Venue *</Label>
                  <Input
                    id="venue"
                    placeholder="Stadium name or address"
                    value={matchRequest.venue}
                    onChange={(e) => handleInputChange("venue", e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Message to Team</Label>
                  <Textarea
                    id="message"
                    placeholder="Add a personal message, match conditions, or any other details..."
                    value={matchRequest.message}
                    onChange={(e) => handleInputChange("message", e.target.value)}
                    rows={4}
                  />
                </div>

                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-blue-900 mb-2">Match Request Summary</h4>
                  <div className="space-y-1 text-sm text-blue-800">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2" />
                      Date: {selectedDate ? format(selectedDate, "PPP") : "Not selected"}
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-2" />
                      Time: {matchRequest.proposedTime || "Not selected"}
                    </div>
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-2" />
                      Venue: {matchRequest.venue || "Not specified"}
                    </div>
                  </div>
                </div>

                <div className="flex space-x-4">
                  <Button type="submit" className="flex-1">
                    Send Match Request
                  </Button>
                  <Button type="button" variant="outline">
                    Save as Draft
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
