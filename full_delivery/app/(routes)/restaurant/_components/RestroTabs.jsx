import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const RestroTabs = () => {
    return (
        <Tabs defaultValue="category" className="w-[400px] mt-10">
            <TabsList>
                <TabsTrigger value="category">Category</TabsTrigger>
                <TabsTrigger value="about">About</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>
            <TabsContent value="category">Category</TabsContent>
            <TabsContent value="about">About</TabsContent>
            <TabsContent value="reviews">Reviews</TabsContent>

        </Tabs>

    )
}

export default RestroTabs