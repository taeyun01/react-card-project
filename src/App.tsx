/** @jsxImportSource @emotion/react */
import Button from './components/shared/Button'
import Text from './components/shared/Text'

function App() {
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

      <div style={{ width: '100%', height: '10', backgroundColor: '#efefef' }}>
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
    </div>
  )
}

export default App
