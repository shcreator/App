'use client'

import { useState } from 'react'
import { Typography, Input, Button, List, Card, Space } from 'antd'
import {
  SendOutlined,
  ShoppingOutlined,
  QuestionCircleOutlined,
} from '@ant-design/icons'
const { Title, Paragraph } = Typography
import { useUserContext } from '@/core/context'
import { useRouter, useParams } from 'next/navigation'
import { useUploadPublic } from '@/core/hooks/upload'
import { useSnackbar } from 'notistack'
import dayjs from 'dayjs'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem'

export default function AIAssistancePage() {
  const router = useRouter()
  const params = useParams<any>()
  const { user } = useUserContext()
  const { enqueueSnackbar } = useSnackbar()

  const [userInput, setUserInput] = useState('')
  const [conversation, setConversation] = useState<
    Array<{ role: string; content: string }>
  >([])

  const generateText = Api.ai.generateText.useMutation()

  const handleSendMessage = async () => {
    if (!userInput.trim()) return

    const newConversation = [
      ...conversation,
      { role: 'user', content: userInput },
    ]
    setConversation(newConversation)
    setUserInput('')

    try {
      const response = await generateText.mutateAsync({
        prompt: `You are an AI shopping assistant. The user says: ${userInput}. Provide a helpful response.`,
      })

      setConversation([
        ...newConversation,
        { role: 'assistant', content: response.answer },
      ])
    } catch (error) {
      enqueueSnackbar('Failed to get AI response. Please try again.', {
        variant: 'error',
      })
    }
  }

  return (
    <PageLayout layout="narrow">
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <Title level={2}>AI Shopping Assistant</Title>
        <Paragraph>
          Ask for product recommendations or any questions about our products.
          Our AI assistant is here to help!
        </Paragraph>

        <Card>
          <List
            dataSource={conversation}
            renderItem={item => (
              <List.Item>
                <Card
                  style={{
                    width: '100%',
                    backgroundColor:
                      item.role === 'user' ? '#f0f2f5' : '#e6f7ff',
                  }}
                >
                  <Space>
                    {item.role === 'user' ? (
                      <ShoppingOutlined />
                    ) : (
                      <QuestionCircleOutlined />
                    )}
                    <Typography.Text>{item.content}</Typography.Text>
                  </Space>
                </Card>
              </List.Item>
            )}
          />
        </Card>

        <Space.Compact style={{ width: '100%' }}>
          <Input
            placeholder="Ask about products or for recommendations..."
            value={userInput}
            onChange={e => setUserInput(e.target.value)}
            onPressEnter={handleSendMessage}
          />
          <Button
            type="primary"
            icon={<SendOutlined />}
            onClick={handleSendMessage}
          >
            Send
          </Button>
        </Space.Compact>
      </Space>
    </PageLayout>
  )
}
