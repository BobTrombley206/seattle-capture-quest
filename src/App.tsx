import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, useSearchParams } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import Book from "./pages/Book.tsx";
import BookingSuccess from "./pages/BookingSuccess.tsx";
import BookingCanceled from "./pages/BookingCanceled.tsx";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

const RootRoute = () => {
  const [searchParams] = useSearchParams();
  const bookingStatus = searchParams.get("booking");

  if (bookingStatus === "success") return <BookingSuccess />;
  if (bookingStatus === "canceled") return <BookingCanceled />;

  return <Index />;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<RootRoute />} />
          <Route path="/book" element={<Book />} />
          <Route path="/booking-success" element={<BookingSuccess />} />
          <Route path="/booking-canceled" element={<BookingCanceled />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
