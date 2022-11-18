interface FormTitleProps {
	className?: string
	text: string
}

export function FormTitle(props: FormTitleProps) {
	return <span className={`${props.className} formTitle`}>{props.text}</span>
}
