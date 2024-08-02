import classes from './QuestionImage.module.css'

type TQuestionImageProps = {
  imagePath: string
}

const QuestionImage = ({ imagePath }: TQuestionImageProps) => {
  return (
    <img
      draggable={false}
      className={classes.image}
      alt="Question Image"
      src={imagePath}
    />
  )
}

export default QuestionImage
