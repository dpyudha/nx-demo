'use client'
import AtomContainer from '@/components/atoms/AtomContainer'
import OrganismsTodoList from '@/components/organisms/OrganismTodoList'
import { TodoProvider } from '@/contexts/TodoContext'

export default function Todo() {

  return (
    <AtomContainer>
      <TodoProvider>
        <OrganismsTodoList />
      </TodoProvider>
    </AtomContainer>
  )
}
