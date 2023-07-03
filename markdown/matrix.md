![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ac2df8b598e24be2ab3087f466cbea75~tplv-k3u1fbpfcp-watermark.image?)

这篇文章尽量不会涉及高深枯燥的理论，因为我怕劝退很多人。接下来我会利用一些工作中常用的例子来阐述矩阵在现实工作中的意义。

如下图，坐标中有一个三角形，三个顶点分别为 A(2,2), B(3,4), C(6,1),假如我们现在需要将这个三角形绕原点逆时针旋转90度，求出新的三角形坐标。
![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ca6ff74ee5b547eeb415b87baa62bd5e~tplv-k3u1fbpfcp-watermark.image?)

针对这一问题，我们第一反应，so easy

假设A点与原点形成的夹角为$\theta$，我们可以求出逆时针旋转90度后新的A'位置

$$
x' = rcos(\theta+90°) = -rsin(\theta) = -2\sqrt(2)×(\frac{2}{2\sqrt(2)}) = -2\\
y' = rsin(\theta+90°) = rcos(\theta) = 2\sqrt(2)×(\frac{2}{2\sqrt(2)}) = 2
$$

同理可以求得B' = (-4,-3),C' = (-1,6)

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ee6cd1753a8e4120b0a61b62d09c0e35~tplv-k3u1fbpfcp-watermark.image?)


对于程序员来说，你可能会封装一个绕原点旋转的公共函数

```js
// x,y代表点坐标，angle代表角度(0~360角度)
function rotate(x,y,angle){
    const r = Math.sqrt(x*x+y*y)
    return {
        x:-r*Math.sin((Math.PI/180)*angle),
        y:r*Math.cos((Math.PI/180)*angle)
    }
}
```
这种方式有个不好的地方在于如果有多个点就要多次调用这个方法,例如
```js
[[2,2],[3,4],[6,1]].map(item=>{
    return rotate(...item,90)
})
```
从数学角度来说，我们需要的是抽象思维，我们可以定义成一个新概念-`矩阵`
$$
\begin{bmatrix}
  2&  3& 6\\
  2&  4&1
\end{bmatrix}
$$

上述的三角形三个点可以考虑成三个向量组，我们可以写入上述的矩阵中，向量的顺序一般`竖着`写，这里我们要改变一般从行优先书写和阅读的习惯。有了矩阵这个概念，我们可以将上述使用函数求解的过程

## 矩阵运算

### 加法
$$
\begin{bmatrix}
  x1&  x2& x3\\
  y1&  y2&y3
\end{bmatrix}
+
\begin{bmatrix}
  a&  c& e\\
  b&  d&f
\end{bmatrix}
=
\begin{bmatrix}
  x1+a&  x2+c& x3+e\\
  y1+b&  y2+d&y3+f
\end{bmatrix}
$$

注意只有行数列数相等才能相加，相加的几何意义其实就是一组向量的相加（可以参考我的上篇博客）

### 减法
减法只需要将符号换成减号即可。
$$
\begin{bmatrix}
  x1&  x2& x3\\
  y1&  y2&y3
\end{bmatrix}
-
\begin{bmatrix}
  a&  c& e\\
  b&  d&f
\end{bmatrix}
=
\begin{bmatrix}
  x1-a&  x2-c& x3-e\\
  y1-b&  y2-d&y3-f
\end{bmatrix}
$$

### 数与矩阵相乘

$$
a
*
\begin{bmatrix}
  b& c\\
  d& e
\end{bmatrix}
=
\begin{bmatrix}
  a*b& a*c\\
  a*d&  a*e
\end{bmatrix}
$$



















