'use client'

import { useState } from 'react'
import {
  Typography,
  Table,
  Button,
  Modal,
  Form,
  Input,
  InputNumber,
  Space,
} from 'antd'
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons'
import { Prisma } from '@prisma/client'
const { Title, Text } = Typography
import { useUserContext } from '@/core/context'
import { useRouter, useParams } from 'next/navigation'
import { useUploadPublic } from '@/core/hooks/upload'
import { useSnackbar } from 'notistack'
import dayjs from 'dayjs'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem'

export default function ProductManagementPage() {
  const router = useRouter()
  const { user } = useUserContext()
  const { enqueueSnackbar } = useSnackbar()

  const [isModalVisible, setIsModalVisible] = useState(false)
  const [form] = Form.useForm()
  const [editingProductId, setEditingProductId] = useState<string | null>(null)

  const {
    data: products,
    isLoading,
    refetch,
  } = Api.product.findMany.useQuery({})
  const { mutateAsync: createProduct } = Api.product.create.useMutation()
  const { mutateAsync: updateProduct } = Api.product.update.useMutation()
  const { mutateAsync: deleteProduct } = Api.product.delete.useMutation()

  const handleAddEdit = async (values: Prisma.ProductCreateInput) => {
    try {
      if (editingProductId) {
        await updateProduct({ where: { id: editingProductId }, data: values })
        enqueueSnackbar('Product updated successfully', { variant: 'success' })
      } else {
        await createProduct({ data: values })
        enqueueSnackbar('Product added successfully', { variant: 'success' })
      }
      setIsModalVisible(false)
      form.resetFields()
      refetch()
    } catch (error) {
      enqueueSnackbar('Error processing product', { variant: 'error' })
    }
  }

  const handleDelete = async (id: string) => {
    try {
      await deleteProduct({ where: { id } })
      enqueueSnackbar('Product deleted successfully', { variant: 'success' })
      refetch()
    } catch (error) {
      enqueueSnackbar('Error deleting product', { variant: 'error' })
    }
  }

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      render: (price: number) => `$${price.toFixed(2)}`,
    },
    {
      title: 'Date Created',
      dataIndex: 'dateCreated',
      key: 'dateCreated',
      render: (date: string) => dayjs(date).format('YYYY-MM-DD HH:mm'),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, record: Prisma.ProductGetPayload<{}>) => (
        <Space>
          <Button
            icon={<EditOutlined />}
            onClick={() => {
              setEditingProductId(record.id)
              form.setFieldsValue(record)
              setIsModalVisible(true)
            }}
          >
            Edit
          </Button>
          <Button
            icon={<DeleteOutlined />}
            danger
            onClick={() => handleDelete(record.id)}
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ]

  return (
    <PageLayout layout="narrow">
      <Title level={2}>Product Management</Title>
      <Text>Manage your digital product catalog</Text>

      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={() => {
          setEditingProductId(null)
          form.resetFields()
          setIsModalVisible(true)
        }}
        style={{ marginBottom: 16, marginTop: 16 }}
      >
        Add New Product
      </Button>

      <Table
        columns={columns}
        dataSource={products}
        rowKey="id"
        loading={isLoading}
      />

      <Modal
        title={editingProductId ? 'Edit Product' : 'Add New Product'}
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <Form form={form} onFinish={handleAddEdit} layout="vertical">
          <Form.Item
            name="name"
            label="Name"
            rules={[
              { required: true, message: 'Please input the product name!' },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="description" label="Description">
            <Input.TextArea />
          </Form.Item>
          <Form.Item
            name="price"
            label="Price"
            rules={[
              { required: true, message: 'Please input the product price!' },
            ]}
          >
            <InputNumber
              min={0}
              step={0.01}
              precision={2}
              style={{ width: '100%' }}
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              {editingProductId ? 'Update' : 'Add'} Product
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </PageLayout>
  )
}
