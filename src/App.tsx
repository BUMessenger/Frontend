import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import PageLayout from "src/components/page/PageLayout";
import { cfg } from "src/config/config";
import SignInPage from "src/pages/AuthPageS/SignInPage";
import NotFoundPage from "src/pages/NotFoundPage/NotFoundPage";
import CheckEmailPage from "./pages/AuthPageS/CheckEmailPage";
import LoginPage from "./pages/AuthPageS/LoginPage";
import ChatPage from "./pages/ChatPageS/ChatPage";
import ViewUserPage from "./pages/UserPageS/ViewUserPage";

export default function App() {
    return (
        <Router basename={cfg.basePath}>
            <PageLayout>
                <Routes>
                    <Route path="/" element={<SignInPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route
                        path="/check/:email/:domain"
                        element={<CheckEmailPage />}
                    />
                    <Route path="/chat" element={<ChatPage />} />
                    <Route path="/profile" element={<ViewUserPage />} />
                    <Route path="*" element={<NotFoundPage />} />
                </Routes>
            </PageLayout>
        </Router>
    );
}
