const Course = ({name, parts}) => {
    return (
      <div>
        <Header course={name} />
        <Content parts={parts} />
        <Total parts={parts} />
      </div>
    )
  }
  
  const Header = (props) => {
    return (
      <>
      <h2>{props.course}</h2>
      </>
    )
  }
  
  const Content = (props) => {   
    return (     
      <>
        {props.parts.map(part =>
          <Part key={part.id} name={part.name} ex={part.exercises} />
        )}
      </>      
    )    
  }
  
  const Total = (props) => {
    return (
      <h3>
        total of {props.parts.reduce((acc, obj) =>
        acc + obj.exercises, 0)} exercises
      </h3>
    )
  }
  
  const Part = (props) => {  
    return (
      <p>{props.name} {props.ex} </p>
    )
  }

  export default Course