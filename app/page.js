"use client";
import { useState, useEffect } from "react";
import { Table, Button, Modal, Form, InputNumber, Input } from "antd";
import CreateExpenseForm from "../components/CreateExpenseForm";

function Page() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isTotalModalOpen, setIsTotalModalOpen] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [totalMoney, setTotalMoney] = useState(0);

  const [expenseForm] = Form.useForm();
  const [totalForm] = Form.useForm();

  const showModal = () => setIsModalOpen(true);
  const handleCancel = () => setIsModalOpen(false);
  const showTotalModal = () => setIsTotalModalOpen(true);
  const handleTotalCancel = () => setIsTotalModalOpen(false);

  const handleOk = () => {
    expenseForm.submit();
  };


  const handleTotalOk = () => {
    totalForm.submit();
  };

  const handleFormFinish = (values) => {
    const formattedValues = {
      ...values,
      date: values.date ? values.date.format("YYYY-MM-DD") : null,
       receivedAmount: undefined,
    };

    const existingData = JSON.parse(localStorage.getItem("expenseData")) || [];
    const updatedData = [...existingData, formattedValues];

    localStorage.setItem("expenseData", JSON.stringify(updatedData));
    setIsModalOpen(false);
    expenseForm.resetFields();

    const formatted = updatedData.map((item, index) => ({
      ...item,
      key: index,
    }));

    setDataSource(formatted);
    setFilteredData(formatted);
  };

  const handleTableChange = (pagination, filters, sorter, extra) => {
    setFilteredData(extra.currentDataSource);
  };

  const handleTotalFinish = (values) => {
    const newTotal = Number(totalMoney) + Number(values.total);
    localStorage.setItem("totalMoney", newTotal);
    setTotalMoney(newTotal);
    setIsTotalModalOpen(false);
    totalForm.resetFields();

    const newEntry = {
    date: new Date().toISOString().slice(0, 10),
    receivedAmount: Number(values.total),  
    note: values.note,
    key: Date.now(),
  };
    const existingData = JSON.parse(localStorage.getItem("expenseData")) || [];
    const updatedData = [...existingData, newEntry];
    localStorage.setItem("expenseData", JSON.stringify(updatedData));

    const formatted = updatedData.map((item, index) => ({
      ...item,
      key: index,
    }));
    setDataSource(formatted);
    setFilteredData(formatted);
  };

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("expenseData")) || [];
    const formatted = data.map((item, index) => ({
      ...item,
      key: index,
    }));
    setDataSource(formatted);
    setFilteredData(formatted);

    const storedTotal = localStorage.getItem("totalMoney");
    setTotalMoney(Number(storedTotal) || 0);
  }, []);

  const calculateTotalExpense = (data) => {
    return data.reduce((sum, item) => sum + Number(item.amount || 0), 0);
  };

  const totalSpent = calculateTotalExpense(filteredData);
  const remainingMoney = totalMoney - totalSpent;

  const columns = [
    { title: "Date", dataIndex: "date", key: "date" },
    { title: "Expense Name", dataIndex: "expenseName", key: "expenseName" },
    { title: "Description", dataIndex: "description", key: "description" },
    { title: "Amount", dataIndex: "amount", key: "amount" },
    {
  title: "Received Amount",
  dataIndex: "receivedAmount",
  key: "receivedAmount",},
    {
      title: "Payment Method",
      dataIndex: "paymentMethod",
      key: "paymentMethod",
      filters: [
        { text: "Cash", value: "Cash" },
        { text: "UPI", value: "UPI" },
        { text: "Card", value: "Card" },
      ],
      onFilter: (value, record) => record.paymentMethod === value,
      // onFilter: (value, record) => console.log(value),
      filterSearch: true,
    },
    { title: "Note", dataIndex: "note", key: "note" },
  ];

  return (
    <div className="p-10">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-5xl">Expense Tracker</h1>
        <div className="space-x-2">
          <Button onClick={showTotalModal} type="default">
            Set Total Money
          </Button>
          <Button onClick={showModal} type="primary">
            Enter Expense
          </Button>
        </div>
      </div>

      {/* Expense Entry Modal */}
      <Modal
        title="Enter Expense"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Save"
      >
        <CreateExpenseForm form={expenseForm} onFinish={handleFormFinish} />
      </Modal>

      {/* Total Money Modal */}
      <Modal
        title="Set Total Money"
        open={isTotalModalOpen}
        onOk={handleTotalOk}
        onCancel={handleTotalCancel}
        okText="Save"
      >
        <Form form={totalForm} onFinish={handleTotalFinish} layout="vertical">
          <Form.Item
            name="total"
            label="Total Money (₹)"
            rules={[{ required: true, message: "Please input total money!" }]}
          >
            <InputNumber style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item
            name="note"
            label="Note"
          >
            <Input style={{ width: "100%" }} />
          </Form.Item>
        </Form>
      </Modal>

      <div className="text-right mt-4 space-y-1 text-lg font-semibold flex justify-between">
        <div>Total Money: ₹{totalMoney}</div>
        <div>Spent: ₹{totalSpent}</div>
        <div>Remaining Money: ₹{remainingMoney >= 0 ? remainingMoney : 0}</div>
      </div>

      <Table
        dataSource={filteredData}
        columns={columns}
        className="mt-6"
        onChange={handleTableChange}
        pagination={false}
      />
    </div>
  );
}

export default Page;
