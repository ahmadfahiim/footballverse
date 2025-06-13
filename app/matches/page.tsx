"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CalendarIcon, MapPin, Clock, Users, CheckCircle, AlertCircle } from "lucide-react"
import { format } from "date-fns"

// Mock data for demonstration
const mockMatches = {
  pending: [
    {
      id: 1,
      opponent: "Thunder FC",
      opponentLogo: "/placeholder.svg?height=40&width=40",
      date: new Date("2024-01-15"),
      time: "15:00",
      venue: "Central Park Field A",
      type: "Friendly Match",
      status: "pending",
      requestedBy: "them",
      message: "Looking forward to a great match! We're a competitive team but play fair.",
    },
    {
      id: 2,
      opponent: "Green Eagles",
      opponentLogo: "/placeholder.svg?height=40&width=40",
      date: new Date("2024-01-20"),
      time: "10:00",
      venue: "Riverside Stadium",
      type: "Practice Game",
      status: "pending",
      requestedBy: "us",
      message: "Great opportunity for both teams to practice before the season starts.",
    },
  ],
  confirmed: [
    {
      id: 3,
      opponent: "Red Lions",
      opponentLogo: "/placeholder.svg?height=40&width=40",
      date: new Date("2024-01-25"),
      time: "14:00",
      venue: "Miami Sports Complex",
      type: "Friendly Match",
      status: "confirmed",
      requestedBy: "us",
      message: "Confirmed! See you on the field.",
    },
  ],
  completed: [
    {
      id: 4,
      opponent: "Blue Sharks",
      opponentLogo: "/placeholder.svg?height=40&width=40",
      date: new Date("2024-01-05"),
      time: "16:00",
      venue: "Ocean View Field",
      type: "Friendly Match",
      status: "completed",
      result: "2-1 Win",
      requestedBy: "them",
    },
  ],
}

export default function MatchesPage() {
  const handleAcceptMatch = (matchId: number) => {
    console.log("Accepting match:", matchId)
    alert("Match accepted! The opponent will be notified.")
  }

  const handleDeclineMatch = (matchId: number) => {
    console.log("Declining match:", matchId)
    alert("Match declined. The opponent will be notified.")
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <AlertCircle className="h-4 w-4 text-yellow-600" />
      case "confirmed":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "completed":
        return <CheckCircle className="h-4 w-4 text-blue-600" />
      default:
        return null
    }
  }

  const getStatusBadge = (status: string, requestedBy?: string) => {
    switch (status) {
      case "pending":
        return (
          <Badge variant="outline" className="text-yellow-700 border-yellow-300">
            {requestedBy === "us" ? "Sent" : "Received"}
          </Badge>
        )
      case "confirmed":
        return <Badge className="bg-green-100 text-green-800">Confirmed</Badge>
      case "completed":
        return <Badge className="bg-blue-100 text-blue-800">Completed</Badge>
      default:
        return null
    }
  }

  const MatchCard = ({ match, showActions = false }: { match: any; showActions?: boolean }) => (
    <Card key={match.id} className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src={match.opponentLogo || "/placeholder.svg"} alt={match.opponent} />
              <AvatarFallback>
                {match.opponent
                  .split(" ")
                  .map((word: string) => word[0])
                  .join("")
                  .toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-lg">{match.opponent}</CardTitle>
              <div className="flex items-center space-x-2 mt-1">
                {getStatusIcon(match.status)}
                {getStatusBadge(match.status, match.requestedBy)}
              </div>
            </div>
          </div>
          <Badge variant="outline">{match.type}</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
          <div className="flex items-center text-gray-600">
            <CalendarIcon className="h-4 w-4 mr-2" />
            {format(match.date, "MMM dd, yyyy")}
          </div>
          <div className="flex items-center text-gray-600">
            <Clock className="h-4 w-4 mr-2" />
            {match.time}
          </div>
          <div className="flex items-center text-gray-600">
            <MapPin className="h-4 w-4 mr-2" />
            {match.venue}
          </div>
        </div>

        {match.message && (
          <div className="bg-gray-50 p-3 rounded-lg">
            <p className="text-sm text-gray-700">"{match.message}"</p>
          </div>
        )}

        {match.result && (
          <div className="bg-blue-50 p-3 rounded-lg">
            <p className="text-sm font-semibold text-blue-800">Result: {match.result}</p>
          </div>
        )}

        {showActions && match.requestedBy === "them" && (
          <div className="flex space-x-2 pt-2">
            <Button size="sm" onClick={() => handleAcceptMatch(match.id)} className="flex-1">
              Accept
            </Button>
            <Button size="sm" variant="outline" onClick={() => handleDeclineMatch(match.id)} className="flex-1">
              Decline
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-4">My Matches</h1>
        <p className="text-gray-600">Manage your match requests and view upcoming games</p>
      </div>

      <Tabs defaultValue="pending" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="pending" className="flex items-center space-x-2">
            <AlertCircle className="h-4 w-4" />
            <span>Pending ({mockMatches.pending.length})</span>
          </TabsTrigger>
          <TabsTrigger value="confirmed" className="flex items-center space-x-2">
            <CheckCircle className="h-4 w-4" />
            <span>Confirmed ({mockMatches.confirmed.length})</span>
          </TabsTrigger>
          <TabsTrigger value="completed" className="flex items-center space-x-2">
            <Users className="h-4 w-4" />
            <span>Completed ({mockMatches.completed.length})</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="pending" className="space-y-4 mt-6">
          {mockMatches.pending.length > 0 ? (
            mockMatches.pending.map((match) => <MatchCard key={match.id} match={match} showActions={true} />)
          ) : (
            <div className="text-center py-12">
              <AlertCircle className="h-12 w-12 mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No pending matches</h3>
              <p className="text-gray-600">Send match requests to other teams to get started</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="confirmed" className="space-y-4 mt-6">
          {mockMatches.confirmed.length > 0 ? (
            mockMatches.confirmed.map((match) => <MatchCard key={match.id} match={match} />)
          ) : (
            <div className="text-center py-12">
              <CheckCircle className="h-12 w-12 mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No confirmed matches</h3>
              <p className="text-gray-600">Accept pending requests or send new ones to schedule matches</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="completed" className="space-y-4 mt-6">
          {mockMatches.completed.length > 0 ? (
            mockMatches.completed.map((match) => <MatchCard key={match.id} match={match} />)
          ) : (
            <div className="text-center py-12">
              <Users className="h-12 w-12 mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No completed matches</h3>
              <p className="text-gray-600">Your match history will appear here after games are played</p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
