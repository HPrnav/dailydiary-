import { Quotes } from "../component/Quotes"
import { AuthBox } from "../component/AuthBox"

export const Signup= () => {
    return <div>
        <div className="grid grid-cols-1 lg:grid-cols-2">
            <div>
                <AuthBox type="signup" />
            </div>
            <div className="hidden lg:block">
                <Quotes />
            </div>
        </div>
    </div>
}