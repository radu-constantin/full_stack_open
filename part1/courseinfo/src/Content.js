import Part from "./Part";

function Content(props) {
  return (
    <>
      <Part name={props.part1} exercises={props.exercises1}/>
      <Part name={props.part2} exercises={props.exercises2}/>
      <Part name={props.part3} exercises={props.exercises3}/>
    </>
  )
}

export default Content;