import { Paw } from "../Paw/Paw";

export function Header() {
    return (
        <header className="header">
            <h1>
                <a href="/1">
                    <Paw />
                Dog&#8202;Finder <span className="city">Chicago</span>
                </a>
            </h1>
        </header>
    );
}
