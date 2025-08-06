"use client";
import { Form, Input, InputNumber, Select, DatePicker } from "antd";

const { Option } = Select;

const CreateExpenseForm = ({ form, onFinish }) => {
  return (
    <Form
      form={form}
      onFinish={onFinish}
      initialValues={{ prefix: "86" }}
      layout="vertical"
    >
      <Form.Item
        name="date"
        label="Date"
        rules={[{ required: true, message: "Please input Date!" }]}
      >
        <DatePicker />
      </Form.Item>

      <Form.Item
        name="expenseName"
        label="Expense Name"
        rules={[{ required: true, message: "Please input expense name!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item name="description" label="Description">
        <Input />
      </Form.Item>

      <Form.Item
        name="amount"
        label="Amount"
        rules={[{ required: true, type: "number", message: "Enter amount" }]}
      >
        <InputNumber style={{ width: "100%" }} />
      </Form.Item>

   <Form.Item
  name="paymentMethod"
  label="Payment Method"
  rules={[{ required: true, message: "Please select a payment method!" }]}
>
  <Select placeholder="Select a payment method">
    <Option value="Cash">Cash</Option>
    <Option value="UPI">UPI</Option>
    <Option value="Card">Card</Option>
  </Select>
</Form.Item>

      <Form.Item name="note" label="Note">
        <Input />
      </Form.Item>
    </Form>
  );
};

export default CreateExpenseForm;
