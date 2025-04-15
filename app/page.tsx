"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { useState, useEffect } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Edit2, ArrowRight, CheckCircle, Loader2, X } from "lucide-react"

export default function DiagnosticPage() {
  const [ceoProfile, setCeoProfile] = useState({
    history: "Fundou a empresa em 2020 após identificar uma oportunidade no mercado...",
    profile: "Líder visionário com forte background em gestão e tecnologia...",
  })

  const [tempProfile, setTempProfile] = useState(ceoProfile)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const [questions] = useState([
    {
      id: 1,
      question: "Como estão estruturados os processos internos hoje?",
      answer: ""
    },
    {
      id: 2,
      question: "Quais indicadores você utiliza para medir o desempenho do atendimento ao cliente?",
      answer: ""
    },
    {
      id: 3,
      question: "Quais os maiores desafios da equipe de Customer Success?",
      answer: ""
    },
    {
      id: 4,
      question: "Você tem lideranças claras definidas em cada área?",
      answer: ""
    },
    {
      id: 5,
      question: "Como você avalia o desempenho financeiro atual da empresa?",
      answer: ""
    }
  ])

  interface Answers {
    [key: number]: string;
  }

  const [answers, setAnswers] = useState<Answers>(
    questions.reduce((acc, q) => ({ ...acc, [q.id]: "" }), {} as Answers)
  )

  interface Analysis {
    swot: {
      strengths: string;
      weaknesses: string;
      opportunities: string;
      threats: string;
    };
    recommendations: string[];
    nextSteps: string[];
  }

  const [analysis, setAnalysis] = useState<Analysis>({
    swot: {
      strengths: "",
      weaknesses: "",
      opportunities: "",
      threats: ""
    },
    recommendations: [],
    nextSteps: []
  })

  const [isLoading, setIsLoading] = useState(false)

  const updateAnswer = (id: number, answer: string) => {
    setAnswers(prev => ({ ...prev, [id]: answer }))
  }

  const handleSaveProfile = () => {
    setCeoProfile(tempProfile)
    setIsDialogOpen(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-12">
        <header className="mb-12 text-center">
          <h1 className="text-4xl font-bold tracking-tight mb-4 text-gray-900 dark:text-white">
            Diagnóstico Organizacional
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Análise completa da estrutura e processos da empresa
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <Card className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">Perfil do CEO</h3>
              <Button 
                variant="outline" 
                onClick={() => setIsDialogOpen(true)}
                className="flex items-center gap-2"
              >
                <Edit2 className="h-4 w-4" />
                Editar
              </Button>
            </div>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">Histórico</h4>
                <p className="text-gray-600 dark:text-gray-300">{ceoProfile.history}</p>
              </div>
              <div>
                <h4 className="font-medium mb-2">Perfil</h4>
                <p className="text-gray-600 dark:text-gray-300">{ceoProfile.profile}</p>
              </div>
            </div>
          </Card>

          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Editar Perfil do CEO</DialogTitle>
                <DialogDescription>
                  Faça as alterações necessárias no histórico e perfil do CEO.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 my-4">
                <div className="space-y-2">
                  <label htmlFor="history" className="font-medium">
                    Histórico
                  </label>
                  <Textarea
                    id="history"
                    value={tempProfile.history}
                    onChange={(e) => setTempProfile({ ...tempProfile, history: e.target.value })}
                    className="w-full resize-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    rows={4}
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="profile" className="font-medium">
                    Perfil
                  </label>
                  <Textarea
                    id="profile"
                    value={tempProfile.profile}
                    onChange={(e) => setTempProfile({ ...tempProfile, profile: e.target.value })}
                    className="w-full resize-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    rows={4}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancelar
                </Button>
                <Button onClick={handleSaveProfile}>Salvar alterações</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <Card className="shadow-lg">
            <CardHeader className="bg-gray-50 dark:bg-gray-800">
              <CardTitle className="text-xl font-semibold">Perguntas-chave para Reflexão</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-6">
                {questions.map((q) => (
                  <div key={q.id} className="space-y-2">
                    <label className="font-medium text-gray-700 dark:text-gray-300">
                      {q.question}
                    </label>
                    <Textarea
                      placeholder="Digite sua resposta aqui..."
                      value={answers[q.id]}
                      onChange={(e) => updateAnswer(q.id, e.target.value)}
                      rows={3}
                      className="w-full resize-none"
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex justify-center mb-12">
          <Button 
            variant="default"
            size="lg" 
            onClick={async () => {
              setIsLoading(true)
              try {
                const prompt = `
                  Com base nas seguintes informações sobre uma empresa:
                  
                  Perfil do CEO:
                  História: ${ceoProfile.history}
                  Perfil: ${ceoProfile.profile}
                  
                  Respostas às perguntas-chave:
                  ${questions.map(q => `${q.question}: ${answers[q.id]}`).join('\n')}
                  
                  Por favor, forneça:
                  1. Uma análise SWOT detalhada
                  2. 5 recomendações principais para escalabilidade
                  3. 5 próximos passos imediatos e práticos
                `

                console.log('Enviando requisição para OpenAI...')
                console.log('API Key:', process.env.NEXT_PUBLIC_OPENAI_API_KEY?.substring(0, 10) + '...')

                const response = await fetch('https://api.openai.com/v1/chat/completions', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`
                  },
                  body: JSON.stringify({
                    model: 'gpt-4-turbo-preview',
                    messages: [
                      {
                        role: 'system',
                        content: `Você é um consultor especializado em análise organizacional. 
                        Forneça análises objetivas e práticas APENAS no seguinte formato JSON, sem usar marcadores Markdown ou qualquer outro texto:
                        {
                          "swot": {
                            "strengths": "texto detalhando os pontos fortes",
                            "weaknesses": "texto detalhando os pontos fracos",
                            "opportunities": "texto detalhando as oportunidades",
                            "threats": "texto detalhando as ameaças"
                          },
                          "recommendations": ["rec1", "rec2", "rec3", "rec4", "rec5"],
                          "nextSteps": ["step1", "step2", "step3", "step4", "step5"]
                        }`
                      },
                      {
                        role: 'user',
                        content: prompt
                      }
                    ],
                    temperature: 0.7
                  })
                })

                if (!response.ok) {
                  const errorData = await response.json().catch(() => null)
                  console.error('Erro na resposta da API:', {
                    status: response.status,
                    statusText: response.statusText,
                    error: errorData
                  })
                  throw new Error(`Erro na chamada da API: ${response.status} ${response.statusText}`)
                }

                console.log('Resposta recebida da OpenAI')
                const data = await response.json()
                console.log('Dados recebidos:', data)

                if (!data.choices?.[0]?.message?.content) {
                  console.error('Resposta inválida da API:', data)
                  throw new Error('Resposta inválida da API')
                }

                const jsonResponse = data.choices[0].message.content
                console.log('Conteúdo da resposta:', jsonResponse)

                // Limpar a resposta removendo marcadores Markdown
                const cleanJsonResponse = jsonResponse
                  .replace(/```json\n/, '') // Remove ```json do início
                  .replace(/```$/, '')      // Remove ``` do final
                  .trim()                   // Remove espaços em branco extras

                console.log('JSON limpo:', cleanJsonResponse)
                
                const analysisResult = JSON.parse(cleanJsonResponse)
                console.log('Análise parseada:', analysisResult)

                setAnalysis(analysisResult)

                // Enviar dados para o webhook
                await fetch('https://hook.us1.make.com/oqv1reow2iqh6pcpmbs369mgbwctmx93', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify({
                    input: {
                      ceoProfile,
                      questions: questions.map(q => ({
                        ...q,
                        answer: answers[q.id]
                      }))
                    },
                    analysis: analysisResult
                  })
                })
              } catch (error) {
                console.error('Erro ao gerar análise:', error)
                setAnalysis({
                  swot: {
                    strengths: "Ocorreu um erro ao gerar a análise. Por favor, tente novamente.",
                    weaknesses: "Ocorreu um erro ao gerar a análise. Por favor, tente novamente.",
                    opportunities: "Ocorreu um erro ao gerar a análise. Por favor, tente novamente.",
                    threats: "Ocorreu um erro ao gerar a análise. Por favor, tente novamente."
                  },
                  recommendations: ["Ocorreu um erro. Por favor, tente novamente."],
                  nextSteps: ["Ocorreu um erro. Por favor, tente novamente."]
                })
              } finally {
                setIsLoading(false)
              }
            }}
            disabled={isLoading}
            className="px-8"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                <span>Gerando Análise...</span>
              </>
            ) : (
              'Gerar Análise'
            )}
          </Button>
        </div>

        {!isLoading && analysis.swot.strengths && (
          <>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
              <Card className="shadow-lg">
                <CardHeader className="bg-gray-50 dark:bg-gray-800">
                  <CardTitle className="text-xl font-semibold">Análise SWOT</CardTitle>
                </CardHeader>
                <CardContent className="pt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-emerald-50 dark:bg-emerald-900/20 p-4 rounded-lg">
                    <h3 className="font-bold text-emerald-700 dark:text-emerald-400 mb-2">Forças</h3>
                    <p className="text-gray-700 dark:text-gray-300">{analysis.swot.strengths}</p>
                  </div>
                  <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg">
                    <h3 className="font-bold text-red-700 dark:text-red-400 mb-2">Fraquezas</h3>
                    <p className="text-gray-700 dark:text-gray-300">{analysis.swot.weaknesses}</p>
                  </div>
                  <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                    <h3 className="font-bold text-blue-700 dark:text-blue-400 mb-2">Oportunidades</h3>
                    <p className="text-gray-700 dark:text-gray-300">{analysis.swot.opportunities}</p>
                  </div>
                  <div className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-lg">
                    <h3 className="font-bold text-amber-700 dark:text-amber-400 mb-2">Ameaças</h3>
                    <p className="text-gray-700 dark:text-gray-300">{analysis.swot.threats}</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-lg">
                <CardHeader className="bg-gray-50 dark:bg-gray-800">
                  <CardTitle className="text-xl font-semibold">Recomendações para Escalabilidade</CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <ul className="space-y-4">
                    {analysis.recommendations.map((rec, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700 dark:text-gray-300">{rec}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
              <Card className="shadow-lg">
                <CardHeader className="bg-gray-50 dark:bg-gray-800">
                  <CardTitle className="text-xl font-semibold">Próximos Passos Imediatos</CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <ol className="space-y-4 list-decimal pl-5">
                    {analysis.nextSteps.map((step, index) => (
                      <li key={index} className="text-gray-700 dark:text-gray-300 pl-2">
                        {step}
                      </li>
                    ))}
                  </ol>
                </CardContent>
              </Card>
            </div>
          </>
        )}

        <div className="flex justify-center mt-8">
          <Link href="/organograma" className="inline-block">
            <Button variant="outline" size="lg" className="group">
              Ver Organograma
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
