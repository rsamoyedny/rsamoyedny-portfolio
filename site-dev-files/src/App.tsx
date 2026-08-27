import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Landing from "./sub-pages/Landing";
import SubBlog from "./sub-pages/SubBlog";
import BlogPost from "./sub-pages/BlogPost";

export default function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Landing />} />
				<Route path="/blog">
					<Route index element={<Navigate to="igme-470" replace />} />
					<Route path="/blog/:subBlogPath">
						<Route index element={<SubBlog />} />
						<Route path=":postPath" element={<BlogPost />} />
					</Route>
				</Route>

			</Routes>
		</BrowserRouter>
	)
}