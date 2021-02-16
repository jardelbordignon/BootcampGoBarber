import styled from 'styled-components'
import { shade } from 'polished'
import { FiArrowLeft, FiArrowRight } from 'react-icons/fi'
import theme from '../../styles/theme.json'

export const Container = styled.div`
`

export const Header = styled.header`
  padding: 32px 0;
  background: ${theme.colors.secondary};
`

export const HeaderContent = styled.div`
  display: flex;
  max-width: 1120px;
  margin: 0 auto;
  align-items: center;

  > img {
    width: 170px;
  }

  button {
    margin-left: auto;
    background: transparent;
    border: 0;
    color: ${theme.colors.white};
    &:hover { color: ${shade(0.2, theme.colors.white)} }

    > svg {
      width: 20px;
      height: 20px;
    }
  }
`

export const Profile = styled.div`
  display: flex;
  align-items: center;
  margin-left: 80px;

  > img, svg {
    width: 56px;
    height: 56px;
    border-radius: 50%;
    background-color: ${theme.colors.background};
  }

  > div {
    display: flex;
    flex-direction: column;
    margin-left: 16px;
    line-height: 24px;
    > span { color: ${shade(0.2, theme.colors.white)} };
    > a {
      color: ${theme.colors.primary};
      &:hover { opacity: 0.8 }
    }
  }
`

export const Content = styled.main`
  display: flex;
  max-width: 1120px;
  margin: 64px auto;
`

export const Schedule = styled.div`
  flex: 1;
  margin-right: 120px;

  h1 { font-size: 36px; }

  p {
    margin-top: 8px;
    color: ${theme.colors.primary};

    span {
      padding-right: 10px;
    }
    > span + span {
      padding-left: 10px;
      border-left: 1px solid ${theme.colors.primary};
    }
  }
`

export const NextAppointment = styled.div`
  margin-top: 64px;

  strong {
    color: ${shade(0.2, theme.colors.white)};
    font-size: 20px;
    font-weight: 400px;
  }

  > div {
    background-color: ${theme.colors.secondary};
    display: flex;
    align-items: center;
    padding: 16px 24px;
    border-radius: 10px;
    margin-top: 24px;
    position: relative;

    // margem lateral
    &::before {
      content: '';
      position: absolute;
      height: 80%;
      width: 2px;
      left: 0;
      top: 10px;
      background-color: ${theme.colors.primary};
    }

    > img {
      height: 80px;
      min-width: 80px;
      border-radius: 50%;
    }

    > strong {
      font-size: 24px;
      margin-left: 24px;
    }

    > span {
      display: flex;
      align-items: center;
      color: ${shade(0.2, theme.colors.white)};
      margin-left: auto;
      > svg {
        font-size: 24px;
        margin: 0 10px 0 24px;
        color: ${theme.colors.primary};
      }
    }
  }
`

export const Session = styled.aside`
  margin-top: 48px;
  color: ${shade(0.2, theme.colors.white)};

  > strong {
    display: block;
    font-size: 2rem;
    line-height: 26px;
    border-bottom: 1px solid ${theme.colors.secondary};
    padding-bottom: 16px;
    margin-bottom: 16px;
  }

  > p {
    color: ${shade(0.2, theme.colors.white)};
  }
`

export const Appointment = styled.aside`
  display: flex;
  align-items: space-between;

  & + aside {
    margin-top: 16px;
  }

  > span {
    display: flex;
    align-items: center;
    padding-right: 26px;
    color: ${shade(0.2, theme.colors.white)};
    > svg {
      font-size: 24px;
      margin-right: 10px;
      color: ${theme.colors.primary};
    }
  }

  > div {
    display: flex;
    width: 100%;
    align-items: center;
    padding: 16px;
    border-radius: 10px;
    background-color: ${theme.colors.secondary};

    > img {
      height: 56px;
      min-width: 56px;
      border-radius: 50%;
    }

    strong {
      font-size: 20px;
      margin-left: 16px;
    }
  }
`

export const Calendar = styled.aside`
  width: 380px;

  .DayPicker {
    border-radius: 10px;

    &-wrapper {
      padding-bottom: 0;
      background:  ${theme.colors.secondary};
      border-radius: 10px;
      z-index: 0;
      position: relative;

      &::before {
        content: '';
        position: absolute;
        height: 1px;
        width: 80%;
        left: 10%;
        top: 0;
        background-color: ${theme.colors.primary};
      }
    }

    &-NavBar {
      position: relative;

      ::before {
        content: '';
        width: 100%;
        height: 50px;
        position: absolute;
        border-radius: 10px 10px 0 0;
        z-index: -1;
        border-bottom: 1px solid ${theme.colors.background};
      }
    }

    &-NavButton {
      color: ${theme.colors.primary} !important;
      margin-top: 0;
      top: 0;

      &--prev {
        margin-top: 15px;
        margin-right: 0;
        left: 100px;
        width: 20px;
        height: 20px;
      }

      &--next {
        margin-top: 15px;
        right: 100px;
        width: 20px;
        height: 20px;
      }
    }

    &-Month {
      border-collapse: separate;
      border-spacing: 8px;
      margin: 0;
      padding: 0 10px 10px;
    }

    &-Caption {
      line-height: 50px;
      color: #f4ede8;

      > div {
        text-align: center;
      }
    }

    &-Weekday {
      color: #666360;
      font-size: 16px;
    }

    &-Day {
      width: 40px;
      height: 40px;
      transition: all 0.2s ease;
      border-radius: 10px;

      &--today {
        font-weight: normal;
        color: #fff;
      }

      &--available:not(.DayPicker-Day--outside) {
        background: #3e3b47;
        border-radius: 10px;
      }

      &--disabled {
        color: #666360;
        background: transparent !important;
      }

      &--selected:not(.DayPicker-Day--disabled) {
        background: ${theme.colors.primary} !important;
        color: ${theme.colors.secondary} !important;
      }
    }

    &:not(.DayPicker--interactionDisabled)
      .DayPicker-Day:not(.DayPicker-Day--disabled):not(.DayPicker-Day--selected):not(.DayPicker-Day--outside):hover {
      background: ${shade(0.2, '#3e3b47')};
    }
  }
`
