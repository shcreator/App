'use client'

import { useState } from 'react'
import { Typography, Upload, List, Button, Space } from 'antd'
import {
  UploadOutlined,
  DeleteOutlined,
  FileTextOutlined,
} from '@ant-design/icons'
import type { UploadFile } from 'antd/es/upload/interface'
import type { UploadedDocument } from '@prisma/client'
const { Title, Text } = Typography
import { useUserContext } from '@/core/context'
import { useRouter, useParams } from 'next/navigation'
import { useUploadPublic } from '@/core/hooks/upload'
import { useSnackbar } from 'notistack'
import dayjs from 'dayjs'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem'

export default function DocumentUploadPage() {
  const router = useRouter()
  const { user } = useUserContext()
  const { enqueueSnackbar } = useSnackbar()
  const { mutateAsync: uploadFile } = useUploadPublic()
  const { mutateAsync: loadFile } = Api.rag.loadFile.useMutation()
  const { mutateAsync: createDocument } =
    Api.uploadedDocument.create.useMutation()
  const { mutateAsync: deleteDocument } =
    Api.uploadedDocument.delete.useMutation()
  const { data: documents, refetch } = Api.uploadedDocument.findMany.useQuery({
    where: { userId: user?.id },
    orderBy: { dateCreated: 'desc' },
  })

  const [uploading, setUploading] = useState(false)

  const handleUpload = async (file: File) => {
    if (!user) {
      enqueueSnackbar('You must be logged in to upload documents', {
        variant: 'error',
      })
      return
    }

    setUploading(true)
    try {
      const { url } = await uploadFile({ file })
      await loadFile({ url })
      await createDocument({
        data: {
          fileUrl: url,
          fileName: file.name,
          userId: user.id,
        },
      })
      enqueueSnackbar('Document uploaded successfully', { variant: 'success' })
      refetch()
    } catch (error) {
      console.error('Upload failed:', error)
      enqueueSnackbar('Failed to upload document', { variant: 'error' })
    } finally {
      setUploading(false)
    }
  }

  const handleDelete = async (documentId: string) => {
    try {
      await deleteDocument({ where: { id: documentId } })
      enqueueSnackbar('Document deleted successfully', { variant: 'success' })
      refetch()
    } catch (error) {
      console.error('Delete failed:', error)
      enqueueSnackbar('Failed to delete document', { variant: 'error' })
    }
  }

  return (
    <PageLayout layout="narrow">
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <Title level={2}>Document Upload</Title>
        <Text>
          Upload documents or files to be processed by the AI RAG agent.
        </Text>

        <Upload
          accept=".pdf,.doc,.docx,.txt"
          beforeUpload={file => {
            handleUpload(file)
            return false
          }}
          fileList={[]}
        >
          <Button icon={<UploadOutlined />} loading={uploading}>
            Click to Upload
          </Button>
        </Upload>

        <Title level={3}>Uploaded Documents</Title>
        <List
          itemLayout="horizontal"
          dataSource={documents}
          renderItem={(item: UploadedDocument) => (
            <List.Item
              actions={[
                <Button
                  key="delete"
                  icon={<DeleteOutlined />}
                  onClick={() => handleDelete(item.id)}
                  danger
                >
                  Delete
                </Button>,
              ]}
            >
              <List.Item.Meta
                avatar={<FileTextOutlined style={{ fontSize: '24px' }} />}
                title={item.fileName}
                description={`Uploaded on ${dayjs(item.dateCreated).format('MMMM D, YYYY HH:mm')}`}
              />
            </List.Item>
          )}
        />
      </Space>
    </PageLayout>
  )
}
