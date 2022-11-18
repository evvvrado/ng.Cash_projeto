import LoadingIconUrl from "../../assets/loading_icon.svg"

export function Loader() {
	return (
		<>
			<div className="page-loader">
				<img src={LoadingIconUrl} alt="imagem de carregamento" />
			</div>
		</>
	)
}
