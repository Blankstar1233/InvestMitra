import { useEffect, useMemo, useRef, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import {
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
  ArrowDownRight,
  Search,
  Filter,
  ShoppingCart,
  Wallet,
  Clock,
  Eye,
  Plus,
  Minus,
  Activity
} from "lucide-react";
import { useMarketData } from "@/hooks/use-market-data";
import { useTrading } from "@/hooks/use-trading";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useAuth } from "@/hooks/use-auth";

export default function Trading() {
  const { stocks, loading, isMarketOpen, searchStocks, filterBySector, getSectors } = useMarketData();
  const { user } = useAuth();
  const { portfolio, placeOrder, getPosition, getOrderHistory, updatePortfolioWithCurrentPrices } = useTrading();
  const { toast } = useToast();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSector, setSelectedSector] = useState("All");
  const [filteredStocks, setFilteredStocks] = useState(stocks);
  const [selectedStock, setSelectedStock] = useState<any>(null);
  const [orderType, setOrderType] = useState<"BUY" | "SELL">("BUY");
  const [quantity, setQuantity] = useState(1);
  const [limitPrice, setLimitPrice] = useState("");
  const [priceType, setPriceType] = useState<"MARKET" | "LIMIT">("MARKET");
  const [watchlist, setWatchlist] = useState<string[]>(["RELIANCE", "TCS", "INFY"]);
  const [errors, setErrors] = useState<{ quantity?: string; limitPrice?: string }>({});
  const searchRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "/") {
        e.preventDefault();
        searchRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (stocks.length > 0) {
      updatePortfolioWithCurrentPrices(stocks);
    }
  }, [stocks, updatePortfolioWithCurrentPrices]);

  useEffect(() => {
    let filtered = searchStocks(searchQuery);
    filtered = filterBySector(selectedSector);
    if (searchQuery) {
      filtered = filtered.filter(stock =>
        stock.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
        stock.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    setFilteredStocks(filtered);
  }, [searchQuery, selectedSector, stocks, searchStocks, filterBySector]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 2,
    }).format(amount);
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-IN').format(num);
  };

  const validate = useMemo(() => {
    const errs: { quantity?: string; limitPrice?: string } = {};
    if (!Number.isInteger(quantity) || quantity <= 0) errs.quantity = "Enter a valid quantity (whole number)";
    if (orderType === "SELL") {
      const pos = selectedStock ? getPosition(selectedStock.symbol) : undefined;
      if (pos && quantity > pos.quantity) errs.quantity = `Max available: ${pos.quantity}`;
    }
    if (priceType === "LIMIT") {
      const val = parseFloat(limitPrice);
      if (!limitPrice || !Number.isFinite(val) || val <= 0) errs.limitPrice = "Enter a valid limit price";
    }
    return errs;
  }, [quantity, priceType, limitPrice, orderType, selectedStock, getPosition]);

  useEffect(() => setErrors(validate), [validate]);

  const handlePlaceOrder = () => {
    if (!selectedStock) return;
    if (Object.keys(errors).length > 0) return;

    const result = placeOrder(
      selectedStock,
      orderType,
      quantity,
      priceType,
      priceType === "LIMIT" ? parseFloat(limitPrice) : undefined
    );

    if (result.success) {
      toast({
        title: "Order Executed",
        description: result.message,
      });
      setSelectedStock(null);
      setQuantity(1);
      setLimitPrice("");
    } else {
      toast({
        title: "Order Failed",
        description: result.message,
        variant: "destructive",
      });
    }
  };

  const toggleWatchlist = (symbol: string) => {
    setWatchlist(prev =>
      prev.includes(symbol)
        ? prev.filter(s => s !== symbol)
        : [...prev, symbol]
    );
  };

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Activity className="h-5 w-5 animate-spin" />
          <p>Loading market data…</p>
        </div>
        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-40" />
            <Skeleton className="h-4 w-60 mt-2" />
          </CardHeader>
          <CardContent className="space-y-2">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="h-16 w-full" />
            ))}
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Auth banner */}
      {!user && (
        <Alert>
          <AlertTitle>Tip</AlertTitle>
          <AlertDescription>
            Sign in to sync your portfolio and orders across devices. Your current session is stored locally.
          </AlertDescription>
        </Alert>
      )}

      {/* Header */}
      <div className="flex flex-col gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground flex items-center gap-2">
            <TrendingUp className="h-6 w-6 sm:h-8 sm:w-8" />
            Trading Terminal
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground mt-1">
            Buy and sell stocks with real-time market simulation
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant={isMarketOpen ? "default" : "secondary"} className="text-xs">
            {isMarketOpen ? "Market Open" : "Market Closed"}
          </Badge>
          <Badge variant="outline" className="bg-success/10 text-success border-success/20 text-xs">
            Cash: {formatCurrency(portfolio.availableCash)}
          </Badge>
        </div>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Search className="h-5 w-5" />
            Stock Search & Filters
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <Input
              ref={searchRef}
              placeholder="Search stocks... (press / to focus)"
              aria-label="Search stocks"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full"
            />
            <Select value={selectedSector} onValueChange={setSelectedSector}>
              <SelectTrigger className="w-full">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Select sector" />
              </SelectTrigger>
              <SelectContent>
                {getSectors().map((sector) => (
                  <SelectItem key={sector} value={sector}>
                    {sector}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Fixed Tabs with proper mobile layout */}
      <Tabs defaultValue="stocks" className="space-y-4">
        <div className="overflow-x-auto">
          <TabsList className="grid grid-cols-4 min-w-full w-max sm:w-full">
            <TabsTrigger value="stocks" className="text-xs sm:text-sm px-2 sm:px-4">
              All Stocks
            </TabsTrigger>
            <TabsTrigger value="watchlist" className="text-xs sm:text-sm px-2 sm:px-4">
              Watchlist
            </TabsTrigger>
            <TabsTrigger value="positions" className="text-xs sm:text-sm px-2 sm:px-4">
              Positions
            </TabsTrigger>
            <TabsTrigger value="orders" className="text-xs sm:text-sm px-2 sm:px-4">
              History
            </TabsTrigger>
          </TabsList>
        </div>

        {/* All Stocks */}
        <TabsContent value="stocks">
          <Card>
            <CardHeader className="pb-4">
              <CardTitle className="text-lg">NSE Stocks</CardTitle>
              <CardDescription className="text-sm">
                Real-time prices with 15-minute delay simulation
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {filteredStocks.map((stock) => {
                  const position = getPosition(stock.symbol);
                  const isInWatchlist = watchlist.includes(stock.symbol);

                  return (
                    <div
                      key={stock.symbol}
                      className="flex flex-col sm:flex-row sm:items-center gap-3 p-3 sm:p-4 rounded-lg border hover:bg-accent/50 transition-colors"
                    >
                      {/* Stock Info - Full width on mobile */}
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-1 sm:gap-2 mb-1">
                          <span className="font-semibold text-sm sm:text-base">{stock.symbol}</span>
                          <Badge variant="outline" className="text-xs px-1 py-0">
                            {stock.sector}
                          </Badge>
                          {position && (
                            <Badge variant="secondary" className="text-xs px-1 py-0">
                              {position.quantity} shares
                            </Badge>
                          )}
                        </div>
                        <p className="text-xs sm:text-sm text-muted-foreground truncate">
                          {stock.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Vol: {formatNumber(stock.volume)} | H: {formatCurrency(stock.high)} | L: {formatCurrency(stock.low)}
                        </p>
                      </div>

                      {/* Price and Actions - Stack on mobile */}
                      <div className="flex items-center justify-between sm:justify-end gap-3 sm:gap-4">
                        <div className="text-left sm:text-right">
                          <p className="font-semibold text-sm sm:text-base">{formatCurrency(stock.price)}</p>
                          <div className={`flex items-center gap-1 text-xs sm:text-sm ${stock.change >= 0 ? 'text-success' : 'text-destructive'
                            }`}>
                            {stock.change >= 0 ? (
                              <ArrowUpRight className="h-3 w-3" />
                            ) : (
                              <ArrowDownRight className="h-3 w-3" />
                            )}
                            <span>
                              {stock.change >= 0 ? '+' : ''}{stock.changePercent}%
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <Button
                            size="sm"
                            variant="ghost"
                            aria-pressed={isInWatchlist}
                            onClick={() => toggleWatchlist(stock.symbol)}
                            className="h-8 w-8 p-0 flex-shrink-0"
                          >
                            <Eye className={`h-3 w-3 sm:h-4 sm:w-4 ${isInWatchlist ? 'text-primary' : 'text-muted-foreground'}`} />
                          </Button>
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button
                                size="sm"
                                onClick={() => setSelectedStock(stock)}
                                className="h-8 px-3 text-xs flex-shrink-0"
                              >
                                Trade
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="w-[95vw] max-w-[420px] max-h-[90vh] overflow-y-auto p-4">
                              <DialogHeader>
                                <DialogTitle className="text-lg">{stock.symbol}</DialogTitle>
                                <DialogDescription className="text-sm">
                                  Current Price: {formatCurrency(stock.price)}
                                </DialogDescription>
                              </DialogHeader>
                              <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-2">
                                  <Button
                                    variant={orderType === "BUY" ? "default" : "outline"}
                                    onClick={() => setOrderType("BUY")}
                                    className="flex items-center gap-2 text-sm"
                                    size="sm"
                                  >
                                    <Plus className="h-3 w-3" />
                                    Buy
                                  </Button>
                                  <Button
                                    variant={orderType === "SELL" ? "default" : "outline"}
                                    onClick={() => setOrderType("SELL")}
                                    className="flex items-center gap-2 text-sm"
                                    size="sm"
                                    disabled={!position || position.quantity === 0}
                                  >
                                    <Minus className="h-3 w-3" />
                                    Sell
                                  </Button>
                                </div>

                                <div className="space-y-2">
                                  <Label htmlFor="quantity" className="text-sm">Quantity</Label>
                                  <Input
                                    id="quantity"
                                    type="number"
                                    min="1"
                                    max={orderType === "SELL" ? position?.quantity || 0 : 1000}
                                    value={quantity}
                                    aria-invalid={Boolean(errors.quantity) || undefined}
                                    aria-describedby={errors.quantity ? 'quantity-error' : undefined}
                                    onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                                    className="text-sm"
                                  />
                                  {errors.quantity && (
                                    <p id="quantity-error" className="text-xs text-destructive">{errors.quantity}</p>
                                  )}
                                  {orderType === "SELL" && position && !errors.quantity && (
                                    <p className="text-xs text-muted-foreground">
                                      Available: {position.quantity} shares
                                    </p>
                                  )}
                                </div>

                                <div className="grid grid-cols-2 gap-2">
                                  <Button
                                    variant={priceType === "MARKET" ? "default" : "outline"}
                                    onClick={() => setPriceType("MARKET")}
                                    size="sm"
                                    className="text-xs"
                                  >
                                    Market
                                  </Button>
                                  <Button
                                    variant={priceType === "LIMIT" ? "default" : "outline"}
                                    onClick={() => setPriceType("LIMIT")}
                                    size="sm"
                                    className="text-xs"
                                  >
                                    Limit
                                  </Button>
                                </div>

                                {priceType === "LIMIT" && (
                                  <div className="space-y-2">
                                    <Label htmlFor="limitPrice" className="text-sm">Limit Price</Label>
                                    <Input
                                      id="limitPrice"
                                      type="number"
                                      step="0.01"
                                      value={limitPrice}
                                      aria-invalid={Boolean(errors.limitPrice) || undefined}
                                      aria-describedby={errors.limitPrice ? 'limit-error' : undefined}
                                      onChange={(e) => setLimitPrice(e.target.value)}
                                      placeholder={stock.price.toString()}
                                      className="text-sm"
                                    />
                                    {errors.limitPrice && (
                                      <p id="limit-error" className="text-xs text-destructive">{errors.limitPrice}</p>
                                    )}
                                  </div>
                                )}

                                <div className="space-y-2 p-3 bg-accent/50 rounded-lg">
                                  <div className="flex justify-between text-xs sm:text-sm">
                                    <span>Quantity:</span>
                                    <span>{quantity}</span>
                                  </div>
                                  <div className="flex justify-between text-xs sm:text-sm">
                                    <span>Price:</span>
                                    <span>{formatCurrency(priceType === "MARKET" ? stock.price : parseFloat(limitPrice) || stock.price)}</span>
                                  </div>
                                  <div className="flex justify-between text-xs sm:text-sm">
                                    <span>Gross:</span>
                                    <span>{formatCurrency(quantity * (priceType === "MARKET" ? stock.price : parseFloat(limitPrice) || stock.price))}</span>
                                  </div>
                                  <div className="flex justify-between text-xs sm:text-sm">
                                    <span>Brokerage:</span>
                                    <span>{formatCurrency(Math.max(quantity * (priceType === "MARKET" ? stock.price : parseFloat(limitPrice) || stock.price) * 0.0003, 20))}</span>
                                  </div>
                                  <div className="flex justify-between font-semibold border-t pt-2 text-xs sm:text-sm">
                                    <span>Total:</span>
                                    <span>{formatCurrency(quantity * (priceType === "MARKET" ? stock.price : parseFloat(limitPrice) || stock.price) + Math.max(quantity * (priceType === "MARKET" ? stock.price : parseFloat(limitPrice) || stock.price) * 0.0003, 20))}</span>
                                  </div>
                                </div>

                                <Button
                                  onClick={handlePlaceOrder}
                                  className="w-full text-sm"
                                  disabled={Boolean(Object.keys(errors).length)}
                                >
                                  Place {orderType} Order
                                </Button>
                              </div>
                            </DialogContent>
                          </Dialog>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Watchlist */}
        <TabsContent value="watchlist">
          <Card>
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Eye className="h-5 w-5" />
                My Watchlist
              </CardTitle>
              <CardDescription className="text-sm">
                Stocks you're tracking
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {stocks
                  .filter(stock => watchlist.includes(stock.symbol))
                  .map((stock) => (
                    <div
                      key={stock.symbol}
                      className="flex flex-col sm:flex-row sm:items-center gap-3 p-3 rounded-lg border"
                    >
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-semibold text-sm sm:text-base">{stock.symbol}</span>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => toggleWatchlist(stock.symbol)}
                            className="h-6 w-6 p-0"
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                        </div>
                        <p className="text-xs sm:text-sm text-muted-foreground truncate">{stock.name}</p>
                      </div>
                      <div className="text-left sm:text-right">
                        <p className="font-semibold text-sm sm:text-base">{formatCurrency(stock.price)}</p>
                        <div className={`flex items-center gap-1 text-xs sm:text-sm ${stock.change >= 0 ? 'text-success' : 'text-destructive'
                          }`}>
                          {stock.change >= 0 ? (
                            <ArrowUpRight className="h-3 w-3" />
                          ) : (
                            <ArrowDownRight className="h-3 w-3" />
                          )}
                          <span>{stock.change >= 0 ? '+' : ''}{stock.changePercent}%</span>
                        </div>
                      </div>
                    </div>
                  ))}
                {watchlist.length === 0 && (
                  <p className="text-center text-muted-foreground py-8 text-sm">
                    No stocks in watchlist. Add stocks by clicking the eye icon.
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Positions */}
        <TabsContent value="positions">
          <Card>
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Wallet className="h-5 w-5" />
                My Positions
              </CardTitle>
              <CardDescription className="text-sm">
                Your current stock holdings
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {portfolio.positions.map((position) => (
                  <div
                    key={position.symbol}
                    className="flex flex-col sm:flex-row sm:items-center gap-3 p-3 rounded-lg border"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-1 sm:gap-2 mb-1">
                        <span className="font-semibold text-sm sm:text-base">{position.symbol}</span>
                        <Badge variant="outline" className="text-xs px-1 py-0">
                          {position.quantity} shares
                        </Badge>
                      </div>
                      <p className="text-xs sm:text-sm text-muted-foreground truncate">{position.name}</p>
                      <p className="text-xs text-muted-foreground">
                        Avg: {formatCurrency(position.avgPrice)} | Current: {formatCurrency(position.currentPrice)}
                      </p>
                    </div>
                    <div className="text-left sm:text-right">
                      <p className="font-semibold text-sm sm:text-base">{formatCurrency(position.currentValue)}</p>
                      <div className={`flex items-center gap-1 text-xs sm:text-sm ${position.pnl >= 0 ? 'text-success' : 'text-destructive'
                        }`}>
                        {position.pnl >= 0 ? (
                          <ArrowUpRight className="h-3 w-3" />
                        ) : (
                          <ArrowDownRight className="h-3 w-3" />
                        )}
                        <span>
                          {position.pnl >= 0 ? '+' : ''}{formatCurrency(position.pnl)} ({position.pnlPercent.toFixed(2)}%)
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
                {portfolio.positions.length === 0 && (
                  <p className="text-center text-muted-foreground py-8 text-sm">
                    No positions yet. Start trading to build your portfolio!
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Order History */}
        <TabsContent value="orders">
          <Card>
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Clock className="h-5 w-5" />
                Order History
              </CardTitle>
              <CardDescription className="text-sm">
                Your recent trading activity
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {getOrderHistory().map((order) => (
                  <div
                    key={order.id}
                    className="flex flex-col sm:flex-row sm:items-center gap-3 p-3 rounded-lg border"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-1 sm:gap-2 mb-1">
                        <span className="font-semibold text-sm sm:text-base">{order.symbol}</span>
                        <Badge
                          variant={order.type === "BUY" ? "default" : "secondary"}
                          className="text-xs px-1 py-0"
                        >
                          {order.type}
                        </Badge>
                        <Badge variant="outline" className="text-xs px-1 py-0">
                          {order.status}
                        </Badge>
                      </div>
                      <p className="text-xs sm:text-sm text-muted-foreground">
                        {order.quantity} shares @ {formatCurrency(order.price)}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(order.timestamp).toLocaleString()}
                      </p>
                    </div>
                    <div className="text-left sm:text-right">
                      <p className="font-semibold text-sm sm:text-base">{formatCurrency(order.totalAmount)}</p>
                      <p className="text-xs text-muted-foreground">
                        Brokerage: {formatCurrency(order.brokerage)}
                      </p>
                    </div>
                  </div>
                ))}
                {portfolio.orders.length === 0 && (
                  <p className="text-center text-muted-foreground py-8 text-sm">
                    No orders yet. Start trading to see your order history!
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}