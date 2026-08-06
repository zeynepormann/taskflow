import { QueryClient } from "@tanstack/react-query"; //cache QueryClientta tutulur

export const queryClient = new QueryClient({
    defaultOptions:{
        queries: {
            staleTime: 60 * 1000, //1dk boyunca data fresh
            retry: 1, //basarısız olursa 1 kere daha dene
            refetchOnWindowFocus: false, //baska sekmeye gidip donunce otomatik istek atmayı kapatır
        }
    }
});