'use client'

import {
  Typography,
  Form,
  Input,
  InputNumber,
  Button,
  Upload,
  Space,
} from 'antd'
import { UploadOutlined, SaveOutlined } from '@ant-design/icons'
import { useState } from 'react'
import { Prisma } from '@prisma/client'
const { Title, Paragraph } = Typography
import { useUserContext } from '@/core/context'
import { useRouter, useParams } from 'next/navigation'
import { useUploadPublic } from '@/core/hooks/upload'
import { useSnackbar } from 'notistack'
import dayjs from 'dayjs'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem'

export default function AddEditProductPage() {
  const router = useRouter()
  const params = useParams<{ productId: string }>()
  const { user } = useUserContext()
  const { enqueueSnackbar } = useSnackbar()
  const [form] = Form.useForm()
  const [fileList, setFileList] = useState<any[]>([])

  const { mutateAsync: upload } = useUploadPublic()
  const { mutateAsync: createProduct } = Api.product.create.useMutation()
  const { mutateAsync: updateProduct } = Api.product.update.useMutation()

  const { data: product, isLoading } = Api.product.findUnique.useQuery(
    { where: { id: params.productId } },
    { enabled: !!params.productId },
  )

  const onFinish = async (values: Prisma.ProductCreateInput) => {
    try {
      let fileUrl = product?.fileUrl

      if (fileList.length > 0) {
        const uploadResult = await upload({ file: fileList[0].originFileObj })
        fileUrl = uploadResult.url
      }

      if (params.productId) {
        await updateProduct({
          where: { id: params.productId },
          data: { ...values, fileUrl },
        })
        enqueueSnackbar('Product updated successfully', { variant: 'success' })
      } else {
        await createProduct({ data: { ...values, fileUrl } })
        enqueueSnackbar('Product created successfully', { variant: 'success' })
      }

      router.push('/admin/products')
    } catch (error) {
      enqueueSnackbar('Error saving product', { variant: 'error' })
    }
  }

  if (isLoading) {
    return <PageLayout layout="narrow">Loading...</PageLayout>
  }

  return (
    <PageLayout layout="narrow">
      <Title level={2}>
        {params.productId ? 'Edit Product' : 'Add New Product'}
      </Title>
      <Paragraph>
        Enter the product details below. You can upload a digital file for the
        product if available.
      </Paragraph>

      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        initialValues={product || {}}
      >
        <Form.Item
          name="name"
          label="Product Name"
          rules={[
            { required: true, message: 'Please input the product name!' },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item name="description" label="Description">
          <Input.TextArea rows={4} />
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

        <Form.Item label="Digital File">
          <Upload
            beforeUpload={() => false}
            onChange={({ fileList }) => setFileList(fileList)}
            fileList={fileList}
          >
            <Button icon={<UploadOutlined />}>Select File</Button>
          </Upload>
        </Form.Item>

        <Form.Item>
          <Space>
            <Button type="primary" htmlType="submit" icon={<SaveOutlined />}>
              Save Product
            </Button>
            <Button onClick={() => router.push('/admin/products')}>
              Cancel
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </PageLayout>
  )
}
