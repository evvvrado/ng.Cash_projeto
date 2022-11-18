interface ButtonProps {
	className?: string
	text: string
}

export function Button(props: ButtonProps) {
	return (
		<button className={`${props.className} form__button-default`} type="submit">
			{props.text}
		</button>
	)
}
