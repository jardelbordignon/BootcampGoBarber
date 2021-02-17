import { useCallback, useRef, useState, ChangeEvent } from 'react'
import { FiArrowLeft, FiMail, FiLock, FiUser, FiCamera, FiCheck } from 'react-icons/fi'
import { FormHandles } from '@unform/core'
import { Form } from '@unform/web'
import * as Yup from 'yup'
import { Link, useHistory } from 'react-router-dom'
import api from '../../services/api'
import { useAuth } from '../../hooks/auth'

import { useToasts } from '../../hooks/toasts'
import getValidationsErrors from '../../utils/getValidationsErrors'
import Button from '../../components/Button'
import Input from '../../components/Input'

import { AnimatedContainer, Header, HeaderContent, Container, Content, AvatarInput } from './styles'

interface IProfile {
  name: string
  email: string
  old_password: string
  password: string
  password_confirmation: string
}

const Profile: React.FC = () => {
  const [loading, setLoading] = useState(false)
  const formRef = useRef<FormHandles>(null)
  const { addToast } = useToasts()
  const history = useHistory()
  const { user, updateUser } = useAuth()

  const handleSubmit = useCallback(
    async (data: IProfile) => {
      try {
        formRef.current?.setErrors({})
        const schema = Yup.object().shape({
          name: Yup.string().required('Nome é obrigatório'),
          email: Yup.string().required('E-mail é obrigatório').email('E-mail inválido'),
          old_password: Yup.string(),
          password: Yup.string().when('old_password', {
            is: (val) => !!val.length,
            then: Yup.string().min(6, 'Senha deve ter 6 dígitos ou mais'),
            otherwise: Yup.string(),
          }),
          password_confirmation: Yup.string()
            .when('old_password', {
              is: (val) => !!val.length,
              then: Yup.string().required('Confirmação é obrigatória'),
              otherwise: Yup.string(),
            })
            .oneOf([Yup.ref('password'), ''], 'Confirmação diferente da senha'),
        })

        await schema.validate(data, { abortEarly: false })

        const { name, email, old_password, password, password_confirmation } = data
        const formData = {
          name,
          email,
          ...(old_password ? { old_password, password, password_confirmation } : {}),
        }

        setLoading(true)
        const response = await api.put('/profile', formData)

        updateUser(response.data)

        addToast({
          type: 'success',
          title: 'Perfil atualizado!',
          description: 'Seu perfil foi atualizado com sucesso!',
        })

        history.push('/')
      } catch (error) {
        if (error instanceof Yup.ValidationError) {
          const errors = getValidationsErrors(error)
          formRef.current?.setErrors(errors)
          return
        }
        // trigger a toast
        addToast({
          type: 'error',
          title: 'Erro na atualização',
          description: 'Ocorreu um erro ao atualizar seu perfil. Tente novamente',
        })
      } finally {
        setLoading(false)
      }
    },
    [addToast, history, updateUser]
  )

  const onChangeAvatarHandler = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
        const data = new FormData()

        data.append('avatar', e.target.files[0])

        setLoading(true)
        api.patch('/users/avatar', data).then((response) => {
          updateUser(response.data)
          addToast({
            type: 'success',
            title: 'Avatar atualizado!',
          })
          setLoading(false)
        })
      }
    },
    [updateUser, addToast]
  )

  return (
    <Container>
      <Header>
        <HeaderContent>
          <Link to="/dash">
            <FiArrowLeft />
          </Link>
        </HeaderContent>
      </Header>
      <Content>
        <AnimatedContainer>
          <AvatarInput>
            {user.avatar_url ? <img src={user.avatar_url} alt={user.name} /> : <FiUser />}
            <label>
              <FiCamera />
              <input type="file" name="avatar" id="avatar" onChange={onChangeAvatarHandler} />
            </label>
          </AvatarInput>

          <Form ref={formRef} initialData={{ name: user.name, email: user.email }} onSubmit={handleSubmit}>
            <h2>Meu Perfil</h2>
            <Input name="name" icon={FiUser} placeholder="Nome" />
            <Input name="email" icon={FiMail} placeholder="E-mail" />
            <br />
            <Input name="old_password" icon={FiLock} placeholder="Senha atual" type="password" />
            <Input name="password" icon={FiLock} placeholder="Nova senha" type="password" />
            <Input name="password_confirmation" icon={FiLock} placeholder="Confirmar senha" type="password" />
            <Button icon={FiCheck} loading={loading}>
              Salvar alterações
            </Button>
          </Form>
        </AnimatedContainer>
      </Content>
    </Container>
  )
}

export default Profile
