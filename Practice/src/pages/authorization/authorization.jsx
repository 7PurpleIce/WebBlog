import { useState, useEffect } from 'react'
import { useDispatch, useSelector, useStore } from 'react-redux'
import { Link, Navigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { server } from '../../bff'
import  { Button, H2, Input } from '../../components'
import * as yup from 'yup'
import styled from 'styled-components'
import { setUser } from '../../actions'
import { selectUserRole } from '../../selectors'
import { ROLE } from '../../constants'

const authFormSchema = yup.object().shape({
    login: yup.string()
        .required('Неверный логин, заполните логин')
        .matches(/\w+$/, 'Неверный логин, допускаются только буквы и цифры')
        .min(3,  'Неверный логин, минимум 3 символа')
        .max(15, 'Неверный логин, максимум 15 символов'),
    password: yup.string()
        .required('Заполните  пароль')
        .matches(/^[\w#%]+$/, 'Неверно заполнен пароль, допускаются буквы, цифры и знаки #%')
        .min(6, 'Неверно заполнен пароль, минимум 6 символа')
        .max(30, 'Неверно заполнен пароль, максимум 30 символов')
}) 

const StyledLink = styled(Link)`
    text-align: center;
    text-decoration: underline;
    margin: 20px 0;
    font-size: 18px;
`

const ErrorMessage = styled.div`
    width: 100%
    font-size: 18px;
    background-color: #fcadad;
    margin: 10px 0 0;
    padding: 10px;
`

export const AuthorizationContainer = ({ className }) => {
    const {
        register,
        reset,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            login: '',
            password: '',
        },
        resolver: yupResolver(authFormSchema),
    })

    const [serverError, setServerError] = useState(null)

    const dispatch = useDispatch();

    const store = useStore()

    const roleId = useSelector(selectUserRole)

    useEffect(() => {
        let currentWasLogout = store.getState().app.wasLogout
        
        return store.subscribe(() => {
            let previousWasLogout = currentWasLogout;
            currentWasLogout = store.getState().app.wasLogout

            if(currentWasLogout !== previousWasLogout) {
                reset();
            }
        })  
    }, [reset, store])

    const onSubmit = ({ login, password }) => {
        server.authorize(login, password).then(({ error, res }) => {
            if (error){
                setServerError(`Ошибка запроса: ${error}`)
                return;
            }

            dispatch(setUser(res))
        });
    }

    const formError =  errors?.login?.message || errors?.password?.message 
    const errorMessage =  formError || serverError;

    if(roleId !== ROLE.GUEST) {
        return <Navigate to="/" />
    }

    return (
        <div className={className}>
            <H2>Авторизация</H2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Input type="text" placeholder='Логин...'  {...register('login', {
                    onChange: () => setServerError(null),
                })} />
                <Input type="password" placeholder='Пароль...'  {...register('password', {
                    onChange: () => setServerError(null),
                })} />
                <Button type='submit' disabled={!!formError}>Авторизоваться</Button>
                {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
                <StyledLink to="/register">Регистрация</StyledLink>
            </form>
        </div>
    )
}

export const Authorization = styled(AuthorizationContainer)`
    display: flex;
    align-items: center;
    flex-direction: column;

    & > form {
        display:flex;
        flex-direction: column;
        width: 260px;
    }
`