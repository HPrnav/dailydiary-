import { Quotes } from "../component/Quotes"
import { AuthBox } from "../component/AuthBox"

export const Signin = () => {
    return <div>
        <div className="grid grid-cols-1 lg:grid-cols-2">
            <div>
                <AuthBox type="signin" />
            </div>
            <div className="hidden lg:block">
                <Quotes />
            </div>
        </div>
    </div>
}