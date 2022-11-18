import React, { InputHTMLAttributes } from "react"
interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
	erro?: any
	registro?: any
}

export function Label({ erro, registro, ...props }: InputProps) {
	return (
		<label className="form__label">
			<input {...props} {...registro} className="form__label__input-default" />
			<span className="form__error-message">{erro}</span>
		</label>
	)
}
