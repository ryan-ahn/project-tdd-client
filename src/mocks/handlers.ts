import { rest } from 'msw';
import uuid from 'react-uuid';

type TStatus = boolean | 'delete';

type TMessage = {
  id: string | number;
  message: string;
  created: Date | string;
  modify: Date | string;
  status: TStatus;
  reference: Array<any>;
};

// Mock data
const data = {
  messages: [
    {
      id: 0,
      message: '이게 가장 최근에 추가한 것',
      created: new Date(),
      modify: '',
      status: true,
      reference: [],
    },
    {
      id: 1,
      message: '쓰레기 봉투 사오기',
      created: new Date(),
      modify: '',
      status: false,
      reference: [],
    },
    {
      id: 2,
      message: '편의점 가서 물 사기',
      created: new Date(),
      modify: '',
      status: false,
      reference: [],
    },
    {
      id: 3,
      message: '스위프트 공부하기',
      created: new Date(),
      modify: '',
      status: true,
      reference: [],
    },
    {
      id: 4,
      message: '모니터 청소하기',
      created: new Date(),
      modify: '',
      status: false,
      reference: [],
    },
    {
      id: 5,
      message: '핸드폰 충전하기',
      created: new Date(),
      modify: '',
      status: false,
      reference: [],
    },
  ] as TMessage[],
};

export const handlers = [
  // GET : Message list
  rest.get('/api/message/', (req, res, ctx) => {
    const filter = Number(req.url.searchParams.get('filter'));
    const page = Number(req.url.searchParams.get('page'));
    let result: TMessage[] = [];
    const filteringData = (filter: number) => {
      switch (filter) {
        default:
          return [...data.messages];
        case 0:
          return [...data.messages]
            .sort((a, b) => {
              return Number(b.created) - Number(a.created);
            })
            .filter(item => item.status !== 'delete')
            .splice((page - 1) * 5, 5);
        case 1:
          return [...data.messages]
            .sort((a, b) => {
              return Number(b.created) - Number(a.created);
            })
            .filter(item => item.status === true)
            .splice((page - 1) * 5, 5);
        case 2:
          return [...data.messages]
            .sort((a, b) => {
              return Number(b.created) - Number(a.created);
            })
            .filter(item => item.status === false)
            .splice((page - 1) * 5, 5);
      }
    };
    result = filteringData(filter);
    return res(
      ctx.status(200),
      ctx.json({
        messages: result,
      }),
    );
  }),

  // GET : Message total count
  rest.get('/api/count/', (req, res, ctx) => {
    const filter = Number(req.url.searchParams.get('filter'));
    let result: number = 0;
    const filteringCount = (filter: number) => {
      switch (filter) {
        default:
          return [...data.messages].filter(item => item.status !== 'delete').length;
        case 0:
          return [...data.messages].filter(item => item.status !== 'delete').length;
        case 1:
          return [...data.messages].filter(item => item.status === true).length;
        case 2:
          return [...data.messages].filter(item => item.status === false).length;
      }
    };
    result = filteringCount(filter);
    return res(
      ctx.status(200),
      ctx.json({
        count: result,
      }),
    );
  }),

  // Post : Add a Message
  rest.post('/api/message/', (req, res, ctx) => {
    const newMessage: TMessage = {
      id: uuid(),
      message: String(req.body),
      created: new Date(),
      modify: '',
      status: true,
      reference: [],
    };
    data.messages.push(newMessage);
    return res(
      ctx.status(200),
      ctx.json({
        messages: newMessage,
      }),
    );
  }),

  // Put : Modify Message
  rest.put('/api/message/:id', (req, res, ctx) => {
    const message = String(req.body);
    for (let i = 0; i < data.messages.length; i++) {
      if (data.messages[i].id == req.params.id) {
        data.messages[i].message = message;
        data.messages[i].modify = new Date();
      }
    }
    return res(
      ctx.status(200),
      ctx.json({
        messages: 'put put put!',
      }),
    );
  }),

  // Put : Modify message status
  rest.put('/api/message/status/:id', (req, res, ctx) => {
    for (let i = 0; i < data.messages.length; i++) {
      if (data.messages[i].id == req.params.id) {
        data.messages[i].status = !data.messages[i].status;
      }
    }
    return res(
      ctx.status(200),
      ctx.json({
        messages: 'put put put!',
      }),
    );
  }),

  // Put : Modify Message Reference
  rest.put<TMessage>('/api/message/ref/:id', (req, res, ctx) => {
    for (let i = 0; i < data.messages.length; i++) {
      if (data.messages[i].id == req.params.id) {
        if (data.messages[i].reference.every(item => item.id !== req.body.id)) {
          console.log(req.body.id, data.messages[i].reference);
          data.messages[i].reference.push(req.body);
        }
      }
    }
    return res(
      ctx.status(200),
      ctx.json({
        messages: 'put put put!',
      }),
    );
  }),

  // Delete : Delete message
  rest.delete('/api/message/:id', (req, res, ctx) => {
    for (let i = 0; i < data.messages.length; i++) {
      if (data.messages[i].id == req.params.id) {
        data.messages[i].status = 'delete';
        data.messages[i].modify = new Date();
      }
    }
    return res(
      ctx.status(200),
      ctx.json({
        messages: 'delete delete!',
      }),
    );
  }),
];
