import { DragDropContext } from 'react-beautiful-dnd'
import { Provider } from 'react-redux'
import store from '../src/utils/store'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {

  const onDragEnd = (result) => {
    console.log(result);
  }
  return <Provider store={store}>
    <DragDropContext onDragEnd={(result) => onDragEnd(result)}>
      <Component {...pageProps} />
    </DragDropContext>
  </Provider>
}

export default MyApp
