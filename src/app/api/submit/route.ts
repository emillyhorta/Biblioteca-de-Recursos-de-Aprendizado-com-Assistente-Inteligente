/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextRequest, NextResponse } from "next/server";
//import { ScrapflyClient, ScrapeConfig } from "scrapfly-sdk";
import searchResultsMock from "@/api-response/search-results.json";
import { SearchResult } from "@/model/searchResult";

//const key = process.env.SCRAPFLY_API_KEY ?? "";
//const client = new ScrapflyClient({ key });

export async function POST(request: NextRequest) {
  const data = await request.formData();

  //TODO: Implement form submission
  console.log("server", data);

  const query: string = "programação";
  try {
    const key = process.env.SCRAPFLY_API_KEY;
    const searchUrl = `https://www.google.com.br/search?q=${encodeURIComponent(
      query
    )}`;

    const url = `https://api.scrapfly.io/scrape?tags=player%2Cproject%3Afrontend-web-intermediario-nextjs-typescript&format=json&extraction_model=search_engine_results&country=br&asp=true&key=${key}&url=${searchUrl}`;

    const response = await fetch(url);

    const result = searchResultsMock;

    const searchResultsApi = result.result.extracted_data.data.results;

    console.log("result", result);

    console.log(searchResultsApi);

    const searchResults: SearchResult[] = [];

    /* FIXME : Error in Scrapfly 
    const apiResponse = await client.scrape(
      new ScrapeConfig({
        tags: [
          "player",
          "project:frontend-web-intermediario-nextjs-typescript",
        ],
        format: "json",
        extraction_model: "search_engine_results",
        asp: true,
        url: `https://www.google.com.br/search?q=${encodeURIComponent(query)}`,
      })
      return apiResponse.result; // Process and return the necessary data
    ); */
  } catch (error) {
    console.error("Erro ao buscar dados da API:", error);
    throw new Error("Falha na busca, tente novamente.");
  }

  return NextResponse.json({ teste: 1 });
}
