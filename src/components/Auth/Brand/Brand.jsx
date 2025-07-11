import { Link } from 'react-router-dom'
import classes from './Brand.module.css'

const Brand = () => {
  return (
    <Link to='/' className={classes.brand}>МИИТ Контакты</Link>
  )
}

export default Brand