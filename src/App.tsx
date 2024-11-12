/** @jsxImportSource @emotion/react */
import Alert from './components/shared/Alert'
import Button from './components/shared/Button'
import Input from './components/shared/Input'
import Text from './components/shared/Text'
import TextField from './components/shared/TextField'
import { useAlertContext } from './contexts/AlertContext'

function App() {
  const { open } = useAlertContext()

  return (
    <div>
      <Text typography="t1" display="block" color="red">
        프로젝트 셋팅 완료 t1
      </Text>
      <Text typography="t2" display="block" color="blue">
        프로젝트 셋팅 완료 t2
      </Text>
      <Text typography="t3" display="block" color="green">
        프로젝트 셋팅 완료 t3
      </Text>
      <Text typography="t4" display="block" color="grey">
        프로젝트 셋팅 완료 t4
      </Text>
      <Text display="block" color="black">
        프로젝트 셋팅 완료 t5
      </Text>

      <hr style={{ margin: '20px 0' }} />

      <div style={{ width: '100%', height: '10' }}>
        <Button>기본 버튼</Button>
        <Button weak>primary weak</Button>
        <Button color="success">success</Button>
        <Button color="success" weak>
          success weak
        </Button>
        <Button color="error">error</Button>
        <Button color="error" weak>
          error weak
        </Button>
        <Button full>full 버튼</Button>
        <Button full disabled>
          full 버튼
        </Button>
      </div>

      <div style={{ width: '100%', height: '10' }}>
        <Input placeholder="로그인" />
        <Input aria-invalid={true} />
      </div>

      <hr style={{ margin: '20px 0' }} />

      <TextField label="아이디" />
      <TextField
        label="비밀번호"
        helpMessage="비밀번호는 최소 8자 이상이어야 합니다."
      />

      <hr style={{ margin: '20px 0' }} />
      <Alert
        open={false}
        title="알림뜸"
        description="내용은 있어도 되고 없어도됨~"
        onButtonClick={() => {}}
      />

      <Button
        onClick={() => {
          open({
            title: '카드신청완료',
            description:
              '카드신청이 완료되었습니다.(root-portal 안에 잘 뜨는지 확인)',
            onButtonClick: () => {
              //
            },
          })
        }}
      >
        open alert
      </Button>
    </div>
  )
}

export default App
