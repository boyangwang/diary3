import { EllipsisOutlined, PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable, TableDropdown } from '@ant-design/pro-components';
import { Button, Dropdown, Space, Tag } from 'antd';
import { useRef } from 'react';

interface GithubIssueItem {
  url: string;
  id: number;
  number: number;
  title: string;
  labels: {
    name: string;
    color: string;
  }[];
  state: string;
  comments: number;
  created_at: string;
  updated_at: string;
  closed_at?: string | null;
}

const mockData = {
  data: [
    {
      url: 'https://chat.openai.com',
      id: 624748504,
      number: 6689,
      title: '🐛 [BUG]yarn install命令 antd2.4.5会报错',
      labels: [{ name: 'bug', color: 'error' }],
      state: 'open',
      locked: false,
      comments: 1,
      created_at: '2020-05-26T09:42:56Z',
      updated_at: '2020-05-26T10:03:02Z',
      closed_at: null,
      author_association: 'NONE',
      user: 'chenshuai2144',
      avatar: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
    },
    {
      url: 'https://chat.openai.com',
      id: 624691229,
      number: 6688,
      title: '🐛 [BUG]无法创建工程npm create umi',
      labels: [{ name: 'bug', color: 'error' }],
      state: 'open',
      locked: false,
      comments: 0,
      created_at: '2020-05-26T08:19:22Z',
      updated_at: '2020-05-26T08:19:22Z',
      closed_at: null,
      author_association: 'NONE',
      user: 'chenshuai2144',
      avatar: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
    },
    {
      url: 'https://chat.openai.com',
      id: 624674790,
      number: 6685,
      title: '🧐 [问题] build 后还存在 es6 的代码（Umi@2.13.13）',
      labels: [{ name: 'question', color: 'success' }],
      state: 'open',
      locked: false,
      comments: 0,
      created_at: '2020-05-26T07:54:25Z',
      updated_at: '2020-05-26T07:54:25Z',
      closed_at: null,
      author_association: 'NONE',
      user: 'chenshuai2144',
      avatar: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
    },
    {
      url: 'https://chat.openai.com',
      id: 624620220,
      number: 6683,
      title: '2.3.1版本如何在业务页面修改头部状态',
      labels: [{ name: 'question', color: 'success' }],
      state: 'open',
      locked: false,
      comments: 2,
      created_at: '2020-05-26T05:58:24Z',
      updated_at: '2020-05-26T07:17:39Z',
      closed_at: null,
      author_association: 'NONE',
      user: 'chenshuai2144',
      avatar: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
    },
    {
      url: 'https://chat.openai.com',
      id: 624592471,
      number: 6682,
      title: 'hideChildrenInMenu设置后，子路由找不到了',
      labels: [{ name: 'bug', color: 'error' }],
      state: 'open',
      locked: false,
      comments: 2,
      created_at: '2020-05-26T04:25:59Z',
      updated_at: '2020-05-26T08:00:51Z',
      closed_at: null,
      author_association: 'NONE',
      user: 'chenshuai2144',
      avatar: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
    },
    {
      url: 'https://chat.openai.com',
      id: 624556297,
      number: 6680,
      title: '🐛 [BUG]Umi UI 添加多个空白页，就会出错！把空白页都变成选中状态！',
      labels: [{ name: 'bug', color: 'error' }],
      state: 'open',
      locked: false,
      comments: 0,
      created_at: '2020-05-26T02:13:47Z',
      updated_at: '2020-05-26T02:13:47Z',
      closed_at: null,
      author_association: 'NONE',
      user: 'chenshuai2144',
      avatar: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
    },
    {
      url: 'https://chat.openai.com',
      id: 624415799,
      number: 6678,
      title: '🐛 [BUG]第一次载入页面，菜单仅图标时，图标没有居中',
      labels: [{ name: 'bug', color: 'error' }],
      state: 'open',
      locked: false,
      comments: 1,
      created_at: '2020-05-25T17:34:21Z',
      updated_at: '2020-05-26T03:05:55Z',
      closed_at: null,
      author_association: 'NONE',
      user: 'chenshuai2144',
      avatar: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
    },
    {
      url: 'https://chat.openai.com',
      id: 624300343,
      number: 6675,
      title: 'build(deps-dev): bump eslint from 6.8.0 to 7.1.0',
      labels: [{ name: 'dependencies', color: 'default' }],
      state: 'open',
      locked: false,
      comments: 0,
      created_at: '2020-05-25T13:27:09Z',
      updated_at: '2020-05-25T13:27:10Z',
      closed_at: null,
      author_association: 'CONTRIBUTOR',
      pull_request: {
        url: 'https://api.github.com/repos/ant-design/ant-design-pro/pulls/6675',
        html_url: 'https://github.com/ant-design/ant-design-pro/pull/6675',
        diff_url: 'https://github.com/ant-design/ant-design-pro/pull/6675.diff',
        patch_url: 'https://github.com/ant-design/ant-design-pro/pull/6675.patch',
      },
      user: 'chenshuai2144',
      avatar: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
    },
    {
      url: 'https://chat.openai.com',
      id: 624130987,
      number: 6674,
      title: '🧐 [问题] V4版本如何使用第三方的enhanceReduxMiddleware',
      labels: [{ name: 'question', color: 'success' }],
      state: 'open',
      locked: false,
      comments: 3,
      created_at: '2020-05-25T08:20:31Z',
      updated_at: '2020-05-26T07:37:47Z',
      closed_at: null,
      author_association: 'NONE',
      user: 'chenshuai2144',
      avatar: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
    },
    {
      url: 'https://chat.openai.com',
      id: 623677811,
      number: 6663,
      title: '🐛 [BUG] 官网预览页面，第一次点击二级菜单，其父级菜单会收起，之后再次点击二级菜单，父菜单正常',
      state: 'open',
      locked: false,
      comments: 1,
      created_at: '2020-05-23T15:00:49Z',
      updated_at: '2020-05-24T23:47:37Z',
      closed_at: null,
      author_association: 'NONE',
      user: 'chenshuai2144',
      avatar: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
      labels: [{ name: 'question', color: 'processing' }],
    },
    {
      url: 'https://chat.openai.com',
      id: 623565176,
      number: 6662,
      title: '🧐 [问题] 从自建 block 仓库下载区块报错。',
      labels: [{ name: 'question', color: 'success' }],
      state: 'open',
      locked: false,
      comments: 0,
      created_at: '2020-05-23T02:46:12Z',
      updated_at: '2020-05-23T03:03:26Z',
      closed_at: null,
      author_association: 'CONTRIBUTOR',
      user: 'chenshuai2144',
      avatar: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
    },
    {
      url: 'https://chat.openai.com',
      id: 622902420,
      number: 6652,
      title: '🧐 [问题] fetchCurrent接口报错，退出登录页，第一次点击登录，SecurityLayout不渲染，导致需要点击两次',
      labels: [{ name: 'question', color: 'success' }],
      state: 'open',
      locked: false,
      comments: 0,
      created_at: '2020-05-22T02:20:27Z',
      updated_at: '2020-05-22T02:21:01Z',
      closed_at: null,
      author_association: 'NONE',
      user: 'chenshuai2144',
      avatar: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
    },
    {
      url: 'https://chat.openai.com',
      id: 622348582,
      number: 6644,
      title: '🐛 [BUG] V5 左侧栏收缩时，点击图标无效。',
      labels: [{ name: 'bug', color: 'error' }],
      state: 'open',
      locked: false,
      comments: 0,
      created_at: '2020-05-21T08:45:13Z',
      updated_at: '2020-05-21T08:45:13Z',
      closed_at: null,
      author_association: 'CONTRIBUTOR',
      user: 'chenshuai2144',
      avatar: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
    },
    {
      url: 'https://chat.openai.com',
      id: 622326186,
      number: 6643,
      title: '🧐 [问题]不知道有没有大佬将这个模板迁移至Electron的例子',
      labels: [{ name: 'question', color: 'success' }],
      state: 'open',
      locked: false,
      comments: 0,
      created_at: '2020-05-21T08:04:36Z',
      updated_at: '2020-05-21T08:04:36Z',
      closed_at: null,
      author_association: 'NONE',
      user: 'chenshuai2144',
      avatar: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
    },
    {
      url: 'https://chat.openai.com',
      id: 622290419,
      number: 6642,
      title: 'npm run start 为什么不能打开浏览器',
      labels: [{ name: 'bug', color: 'error' }],
      state: 'open',
      locked: false,
      comments: 3,
      created_at: '2020-05-21T06:51:22Z',
      updated_at: '2020-05-24T23:51:59Z',
      closed_at: null,
      author_association: 'NONE',
      user: 'chenshuai2144',
      avatar: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
    },
    {
      url: 'https://chat.openai.com',
      id: 622267649,
      number: 6641,
      title: '🧐 [问题]在重新npm install后运行npm start报出一些less找不到，但项目可以正常运行起来',
      labels: [{ name: 'question', color: 'success' }],
      state: 'open',
      locked: false,
      comments: 3,
      created_at: '2020-05-21T05:56:36Z',
      updated_at: '2020-05-22T01:38:30Z',
      closed_at: null,
      author_association: 'NONE',
      user: 'chenshuai2144',
      avatar: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
    },
    {
      url: 'https://chat.openai.com',
      id: 622207575,
      number: 6639,
      title: '🐛 [BUG]错误通知：http code 200',
      labels: [{ name: 'bug', color: 'error' }],
      state: 'open',
      locked: false,
      comments: 4,
      created_at: '2020-05-21T02:47:35Z',
      updated_at: '2020-05-24T16:27:00Z',
      closed_at: null,
      author_association: 'NONE',
      user: 'chenshuai2144',
      avatar: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
    },
    {
      url: 'https://chat.openai.com',
      id: 621402301,
      number: 6630,
      title: '🐛 [BUG]线上预览项目好多布局错乱，不知道是antd的锅还是啥原因',
      labels: [{ name: 'In Progress', color: 'processing' }],
      state: 'open',
      locked: false,
      comments: 8,
      created_at: '2020-05-20T02:02:33Z',
      updated_at: '2020-05-20T08:13:24Z',
      closed_at: null,
      author_association: 'NONE',
      user: 'chenshuai2144',
      avatar: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
    },
    {
      url: 'https://chat.openai.com',
      id: 621388407,
      number: 6629,
      title: '🐛 [BUG] umi 偶尔出现没有导出成员',
      labels: [{ name: 'bug', color: 'error' }],
      state: 'open',
      locked: false,
      comments: 19,
      created_at: '2020-05-20T01:20:55Z',
      updated_at: '2020-05-24T23:53:03Z',
      closed_at: null,
      author_association: 'CONTRIBUTOR',
      user: 'chenshuai2144',
      avatar: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
    },
    {
      url: 'https://chat.openai.com',
      id: 620820348,
      number: 6624,
      title: '🐛 [BUG]请问大佬，为什么无论怎么选择，都无法切换成JS语言，怎么下都是TS,求解答',
      labels: [{ name: 'bug', color: 'error' }],
      state: 'open',
      locked: false,
      comments: 6,
      created_at: '2020-05-19T09:22:47Z',
      updated_at: '2020-05-25T03:50:54Z',
      closed_at: null,
      author_association: 'NONE',
      user: 'chenshuai2144',
      avatar: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
    },
  ],
  page: 1,
  success: true,
  total: 30,
};

const columns: ProColumns<GithubIssueItem>[] = [
  {
    dataIndex: 'index',
    valueType: 'indexBorder',
    width: 48,
  },
  {
    title: '标题',
    dataIndex: 'title',
    copyable: true,
    ellipsis: true,
    tip: '标题过长会自动收缩',
    formItemProps: {
      rules: [
        {
          required: true,
          message: '此项为必填项',
        },
      ],
    },
  },
  {
    disable: true,
    title: '状态',
    dataIndex: 'state',
    filters: true,
    onFilter: true,
    ellipsis: true,
    valueType: 'select',
    valueEnum: {
      all: { text: '超长'.repeat(50) },
      open: {
        text: '未解决',
        status: 'Error',
      },
      closed: {
        text: '已解决',
        status: 'Success',
        disabled: true,
      },
      processing: {
        text: '解决中',
        status: 'Processing',
      },
    },
  },
  {
    disable: true,
    title: '标签',
    dataIndex: 'labels',
    search: false,
    renderFormItem: (_, { defaultRender }) => {
      return defaultRender(_);
    },
    render: (_, record) => (
      <Space>
        {record.labels.map(({ name, color }) => (
          <Tag color={color} key={name}>
            {name}
          </Tag>
        ))}
      </Space>
    ),
  },
  {
    title: '创建时间',
    key: 'showTime',
    dataIndex: 'created_at',
    valueType: 'date',
    sorter: true,
    hideInSearch: true,
  },
  {
    title: '创建时间',
    dataIndex: 'created_at',
    valueType: 'dateRange',
    hideInTable: true,
    search: {
      transform: (value) => {
        return {
          startTime: value[0],
          endTime: value[1],
        };
      },
    },
  },
  {
    title: '操作',
    valueType: 'option',
    key: 'option',
    render: (text, record, _, action) => [
      <button
        key="editable"
        onClick={() => {
          action?.startEditable?.(record.id);
        }}
      >
        编辑
      </button>,
      <a href={record.url} target="_blank" rel="noopener noreferrer" key="view">
        查看
      </a>,
      <TableDropdown
        key="actionGroup"
        onSelect={() => action?.reload()}
        menus={[
          { key: 'copy', name: '复制' },
          { key: 'delete', name: '删除' },
        ]}
      />,
    ],
  },
];

function EntryAllInOneTable() {
  const actionRef = useRef<ActionType>();
  return (
    <ProTable<GithubIssueItem>
      columns={columns}
      actionRef={actionRef}
      cardBordered
      dataSource={mockData.data}
      editable={{
        type: 'multiple',
      }}
      columnsState={{
        persistenceKey: 'pro-table-singe-demos',
        persistenceType: 'localStorage',
        onChange(value) {
          console.log('value: ', value);
        },
      }}
      rowKey="id"
      search={{
        labelWidth: 'auto',
      }}
      options={{
        setting: {
          listsHeight: 400,
        },
      }}
      form={{
        // 由于配置了 transform，提交的参与与定义的不同这里需要转化一下
        syncToUrl: (values, type) => {
          if (type === 'get') {
            return {
              ...values,
              created_at: [values.startTime, values.endTime],
            };
          }
          return values;
        },
      }}
      pagination={{
        pageSize: 5,
        onChange: (page) => console.log(page),
      }}
      dateFormatter="string"
      headerTitle="高级表格"
      toolBarRender={() => [
        <Button key="button" icon={<PlusOutlined />} type="primary">
          新建
        </Button>,
        <Dropdown
          key="menu"
          menu={{
            items: [
              {
                label: '1st item',
                key: '1',
              },
              {
                label: '2nd item',
                key: '1',
              },
              {
                label: '3rd item',
                key: '1',
              },
            ],
          }}
        >
          <Button>
            <EllipsisOutlined />
          </Button>
        </Dropdown>,
      ]}
    />
  );
}
export default EntryAllInOneTable;
